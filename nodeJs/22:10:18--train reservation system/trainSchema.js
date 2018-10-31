var mongoose = require("mongoose");

var Schema = new mongoose.Schema({

    trainNumber: { type: Number, required: true, default: 0 },
    noOfSeats: Number,
    arrivalTime: { type: String },
    departureTime: { type: String }
});

module.exports = mongoose.model("train", Schema);