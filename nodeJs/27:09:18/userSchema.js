var mongoose = require("mongoose");
var validate = require('mongoose-validator')
var Schema = new mongoose.Schema({

    email: {
        type: String,
        unique: true,
        validate: function(email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        }
    },
    userInfo: {
        username: String,
        address: String
    },
    status: {
        type: String,
        enum: ['activated', 'dactivated', 'deleted']
    },
    password: String
});

module.exports = mongoose.model("user", Schema);