var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema2 = new Schema({
    name: String,
    id: [
        { type: Schema.Types.ObjectId, ref: 'schema1' }
    ]
});

module.exports = mongoose.model('schema1', schema2);