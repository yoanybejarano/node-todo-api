const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// var id = "5b959d0598ceb56b3fc6b859";
// if (!ObjectID.isValid(id)) console.log('ID is not valid');
//
// Todo.find({_id: id}).then(function (todos) {
//     console.log('Todos', todos);
// });
//
// Todo.findOne({_id: id}).then(function (todo) {
//     console.log('Todo', todo);
// });
//
// Todo.findById(id).then(function (todo) {
//     console.log('Todo by id', todo);
// });

var id = "5b95454c0861e7bbd4b4d865";
if (!ObjectID.isValid(id)) console.log('ID is not valid');

User.find({_id: id}).then(function (users) {
    console.log('User', users);
}, function (err) {
    console.log(err);
});

User.findOne({_id: id}).then(function (user) {
    if(!user) return console.log('Unable to find a user');
    console.log('User', user);
}, function (err) {
    console.log(err);
});

User.findById(id).then(function (user) {
    if(!user) return console.log('Unable to find a user');
    console.log('User by id', user);
}, function (err) {
    console.log(err);
});