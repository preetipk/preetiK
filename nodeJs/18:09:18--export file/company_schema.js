var mongoose = require("mongoose");
var Schema = new mongoose.Schema({ //created schema
    company_name: String,
    address: String,
    country: String,
    state: String,
    city: String,
    status: String
});

module.exports = mongoose.model("companies", Schema);