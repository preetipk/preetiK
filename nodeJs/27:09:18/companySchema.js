var mongoose = require("mongoose");
var validate = require('mongoose-validator')
var Schema = new mongoose.Schema({

    companyName: String,
    "companyInfo": {
        fax: Number,
        RegistartionNo: Number,
        userInfo: {
            userEmail: {
                type: String,
                unique: true,
                validate: function(email) {
                    return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
                }
            },
            status: String
        }

    },

});

module.exports = mongoose.model("Company", Schema);