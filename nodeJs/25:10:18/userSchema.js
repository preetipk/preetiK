var mongoose = require("mongoose");

var Schema = new mongoose.Schema({

    email: {
        type: String,
        required: true,

        validate: function(email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        }
    },

    password: { type: String, required: true }
});

module.exports = mongoose.model("user", Schema);