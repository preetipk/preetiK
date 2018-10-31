var mongoose = require("mongoose");
var validate = require('mongoose-validator');
var mongoosePaginate = require('mongoose-paginate');
var Schema = new mongoose.Schema({
    studentId: {
        type: Number,
        unique: true
    },
    studName: String,
    address: String,
    country: String,
    stste: String,
    Schoolemail: {
        type: String,
        unique: true,
        validate: function(email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        }
    },
    status: {
        type: String,
        enum: ['present', 'absent']
    }
});
Schema.plugin(mongoosePaginate);
module.exports = mongoose.model("Student", Schema);