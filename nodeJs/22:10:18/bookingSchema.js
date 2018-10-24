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
        type: Date
    },
    btime: { type: String },
    trainNumber: Number,
    status: String
});

// function dateValidator(value) {
//     // `this` is the mongoose document
//     return this.bdate === Date.toString('YYYY-MM-DD');

// }

module.exports = mongoose.model("Booking", Schema);