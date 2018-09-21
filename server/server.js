require('./config/config');

var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
const { ObjectID } = require('mongodb');
var { authenticate } = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', authenticate, async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt,
        _creator: req.user._id
    });
    try {
        const doc = await todo.save();
        res.send(doc);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/todos', authenticate, async (req, res) => {

    try {
        const todos = await Todo.find({ _creator: req.user._id });
        res.send({ todos });
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/todos/:id', authenticate, async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send();
    }
    try {
        const todo = await Todo.findOne({ _id: req.params.id, _creator: req.user._id });
        if (!todo) return res.status(404).send();
        res.send({ todo });
    } catch (err) {
        res.status(400).send(err);
    }
});

app.delete('/todos/:id', authenticate, async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send();
    }
    try {
        const todo = await Todo.findOneAndRemove({ _id: req.params.id, _creator: req.user._id });
        if (!todo) return res.status(404).send();
        res.send({ todo });
    } catch (err) {
        res.status(400).send(err);
    }
});

app.patch('/todos/:id', authenticate, async (req, res) => {

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

    try {
        const todo = await Todo.findOneAndUpdate({
            _id: id,
            _creator: req.user._id
        }, { $set: body }, { new: true });
        if (!todo) return res.status(404).send();
        res.send({ todo });
    } catch (err) {
        res.status(400).send(err);
    }
});


app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send({ 'count': users.length, users });
    } catch (err) {
        res.status(400).send(err);
    }
});

app.post('/users', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = new User(body);
        const resultUser = await user.save();
        const token = await resultUser.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (err) {
        res.status(400).send(err);
    }
});

app.listen(3000, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };