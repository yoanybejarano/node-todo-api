var mongoose = require('mongoose');

var Todo = mongoose.model('todos', {
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
});

module.exports = {Todo};