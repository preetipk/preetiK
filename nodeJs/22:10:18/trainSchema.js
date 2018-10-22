var mongoose = require("mongoose");

var Schema = new mongoose.Schema({

    trainNo: { type: Number, required: true },
    noOfSeats: Number,
    arrivalTime: { type: String },
    departureTime: { type: String }
});

module.exports = mongoose.model("train", Schema);