var mongoose = require("mongoose");
var validate = require('mongoose-validator')
var Schema = new mongoose.Schema({

    companyName: { type: String, required: true },
    "companyInfo": {
        Fax: Number,
        RegistartionNo: { type: Number, required: true },
        userInfo: {
            userEmail: {
                type: String,
                //required: true,
                //unique: true,
                validate: function(email) {
                    return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
                }
            },

        },
        status: String

    },

});

module.exports = mongoose.model("Company", Schema);