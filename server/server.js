require('./config/config');

var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find({}).then((todos) => {
        res.send({
            'count': todos.length,
            todos
        });
    }, (err) => {
        console.log(err);
    });
});

// app.get('/users/:id', (req, res) => {
//     if (!ObjectID.isValid(req.params.id)) {
//         console.log('ID is not valid');
//         return res.status(404).send();
//     }
//     User.findById(req.params.id).then((user) => {
//         if (!user) return res.status(404).send();
//         res.send({user});
//     }).catch(function (err) {
//         res.status(400).send();
//     });
// });

app.delete('/todos/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        console.log('ID is not valid');
        return res.status(404).send();
    }
    Todo.findByIdAndDelete({_id: req.params.id}).then((todo) => {
        if (!todo) return res.status(404).send();
        res.send({todo});
    }).catch((err) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) return res.status(404).send();
        res.send({todo});
    }).catch((err) => {
        res.status(400).send();
    });

});


app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(
            {
                'count': users.length,
                users
            });
    }, (err) => {
        console.log(err);
    });
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    var user = new User(body);
    user.save().then((user) => {

        return user.generateAuthToken();

    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });

});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(3000, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};