const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findOneAndRemove({_id:'5b97ca90de4dac7c709e1160'}).then((todo) => {
    console.log(todo);
 });

// Todo.findOneAndDelete('5b97c9fade4dac7c709e114d').then((todo) => { 
//     console.log(todo);
// });