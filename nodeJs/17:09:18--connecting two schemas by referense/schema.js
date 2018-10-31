var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema1 = new Schema({
    id: String
});

module.exports = mongoose.model('idschema', schema1);