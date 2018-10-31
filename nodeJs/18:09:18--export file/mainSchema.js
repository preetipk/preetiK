var mongoose = require("mongoose");
var Schema = new mongoose.Schema({ //created schema

    id: String
});

module.exports = mongoose.model("ids", Schema);