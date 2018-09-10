var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');

var app = express();

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

app.get('/users/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        console.log('ID is not valid');
        return res.status(404).send();
    }
    User.findById(req.params.id).then((user) => {
        if (!user) return res.status(404).send();
        res.send({user});
    }).catch(function (err) {
        res.status(400).send();
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};