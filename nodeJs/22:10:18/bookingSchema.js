var mongoose = require("mongoose");

var Schema = new mongoose.Schema({

    email: {
        type: String,
        //required: true,
        validate: function(email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        }
    },
    bdate: {
        type: Date,
        validate: [dateValidator, 'Date must be greater than current dates']
    },
    btime: { type: String },
    trainNumber: Number,
    status: String
});

function dateValidator(value) {
    // `this` is the mongoose document
    return this.bdate >= Date.now();
}

module.exports = mongoose.model("Booking", Schema);