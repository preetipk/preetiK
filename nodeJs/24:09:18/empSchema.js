var mongoose = require("mongoose");
var validate = require('mongoose-validator');
var mongoosePaginate = require('mongoose-paginate');
var Schema = new mongoose.Schema({

    empName: String,
    empAddress: String,
    country: String,
    stste: String,
    department: String,
    status: String
});
schema.plugin(mongoosePaginate);
module.exports = mongoose.model("Employee", Schema);