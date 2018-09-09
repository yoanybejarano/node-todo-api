var mongoose = require('mongoose');

var User = mongoose.model('users', {
    name: {
        type: String
    },
    age: {
        type: Number
    },
    location: {
        type: String
    }
});

module.exports = {User};