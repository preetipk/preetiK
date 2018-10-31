// var mongoose = require("mongoose");
// //var validate = require('mongoose-validator')
// var userSchema = new mongoose.Schema({

//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         validate: function(email) {
//             return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
//         }
//     },
//     userInfo: {
//         username: { type: String, required: true },
//         address: { type: String, required: true }
//     },
//     status: {
//         type: String,
//         enum: ['activated', 'dactivated', 'deleted']
//     },
//     password: { type: String, required: true }
// });

// module.exports = mongoose.model("user", userSchema);