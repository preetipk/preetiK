var express = require('express');
var app = express();
app.use(express.json());
var bodyParser = require('body-parser');
const companies = require('./company_schema');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var async = require('async');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Company');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); })

app.get('/companies', function(req, res) {
    async.series([
        function(callback) {
            companies.find({ "status": "activated" }, function(err, data) {
                console.log("data is=" + data);
                if (err) {
                    console.log(err);
                } else if (data.length > 0) {
                    callback(null, data);
                } else {
                    callback("data not found");
                }
            })
        },

    ], function(error, Data) {
        if (error) {
            res.send(error);
        } else {
            console.log("data=" + Data);
            res.send(Data);
        }
    })
});

app.get('/company/:company_name', function(req, res) {
    console.log("calling get by company_name");

    var company_name = req.params.company_name;
    console.log("company_name is=" + company_name);


    async.series([
        function(callback) {
            companies.find({ $and: [{ "status": "activated" }, { "company_name": company_name }] }, function(err, data) {
                console.log("data is=" + data);
                if (err) {
                    console.log(err);
                } else if (data.length > 0) {
                    callback(null, data);
                } else {
                    callback("company is not exist record or its status is deactivate");
                }
            })
        },

    ], function(error, Data) {
        if (error) {
            res.send(error);
        } else {
            console.log("data=" + Data);
            res.send(Data);
        }
    })
});


app.get('/companies/:company', function(req, res) {
    console.log("calling get by company_name and state");

    var company = req.params.company;
    console.log("company_name=" + company);

    var state = req.query.state;
    console.log("state=" + state);

    async.series([
        function(callback) {
            companies.find({ $and: [{ "status": "activated" }, { "company_name": company }, { "state": state }] }, function(err, data) {
                console.log("data is=" + data);
                if (err) {
                    console.log(err);

                } else if (data.length > 0) {
                    callback(null, data);
                } else {
                    callback("data not found");
                }
            })
        },

    ], function(error, Data) {
        if (error) {
            res.send(error);
        } else {
            console.log("data=" + Data);
            res.send(Data);
        }
    })
});

app.post('/newCompany', function(req, res) {
    console.log("calling post method");
    company_name = req.body.company_name;
    console.log("company name=" + company_name);
    let newCompany = new companies();

    newCompany.company_name = company_name;
    newCompany.address = req.body.address;
    newCompany.country = req.body.country;
    newCompany.state = req.body.state;
    newCompany.city = req.body.city;
    newCompany.status = req.body.status;

    async.series([
        function(callback) {
            companies.find({ $and: [{ "status": "activated" }, { "company_name": company_name }] }, function(err, data) {
                console.log("data=" + JSON.stringify(data));
                if (err) {
                    console.log(err);

                } else if (data.length !== 0) {
                    callback("company already exist or status is dactivate");
                } else {
                    callback();
                }
            })
        },
        function(callback) {
            newCompany.save(function(err, data) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log(data);
                    callback("data inserted successfully");

                }
            })
        }
    ], function(error, done) {
        if (error) {
            res.send(error);
        } else {
            res.send(done);
        }
    })
})

app.put('/companyUpdates/:company_name', function(req, res) {
    //console.log("calling put method");
    company_name = req.params.company_name;
    //console.log("company_name=" + company_name);

    let company = {};
    company.company_name = company_name;
    company.address = req.body.address;
    company.country = req.body.country;
    company.state = req.body.state;
    company.city = req.body.city;
    company.status = req.body.status;
    console.log("company=" + JSON.stringify(company));

    async.series([
        function(callback) {
            companies.find({ $and: [{ "status": "activated" }, { "company_name": company_name }] }, function(err, data) {
                console.log("data=" + data);
                if (err) {
                    console.log(err);
                } else if (data.length) {
                    callback();
                } else {
                    callback("company not exist in records");
                }
            })


        },
        function(callback) {
            companies.updateMany({ $and: [{ "status": "activated" }, { "company_name": company_name }] }, company, function(err) {
                console.log("in update function");
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log(company);
                    callback("data with " + company_name + " updated successfully");
                }
            })
        }
    ], function(error, done) {
        if (error) {
            res.send(error);
        } else {
            res.send(done);
        }
    })
})

app.put('/companyUpdates', function(req, res) {
    console.log("calling put method");
    state = req.query.state;
    console.log("state=" + state);

    let company = {};
    company.company_name = req.body.company_name;
    company.address = req.body.address;
    company.country = req.body.country;
    company.state = state;
    company.city = req.body.city;

    console.log("company=" + JSON.stringify(company));

    async.series([
        function(callback) {
            companies.find({ "state": state }, function(err, data) {
                console.log("data=" + data);
                if (err) {
                    console.log(err);
                } else if (data.length !== 0) {
                    callback();
                } else {
                    callback("state not exist in records");
                }
            })
        },
        function(callback) {
            companies.updateMany({ "state": state }, { $set: { "status": "activated" } }, company, function(err) {
                console.log("in update function");
                if (err) {
                    console.log(err);
                    return;
                } else {
                    //console.log("data");
                    callback(null, "data with " + state + " updated successfully");
                }
            })
        }
    ], function(error, done) {
        if (error) {
            res.send(error);
        } else {
            res.send(done);
        }
    })
})

app.delete('/companyDelete/:company_name', function(req, res) {
    //console.log("calling delete method");
    company_name = req.params.company_name;
    //console.log("company_name=" + company_name);

    async.series([
        function(callback) {
            companies.find({ $and: [{ "status": "activated" }, { "company_name": company_name }] }, function(err, data) {
                console.log("data" + data);
                if (err) {
                    console.log(err);
                } else if (data.length !== 0) {
                    callback();
                } else {
                    callback("company not exist in recoprd or status is deactivate");
                }
            })
        },
        function(callback) {
            companies.updateMany({ "company_name": company_name }, { $set: { "status": "deleted" } }, function(err) {
                console.log("in update function");
                if (err) {
                    console.log(err);
                    return;
                } else {
                    callback(null, "data with " + company_name + " deleted successfully");
                }
            })
        }
    ], function(error, done) {
        if (error) {
            res.send(error);
        } else {
            res.send(done);
        }
    })
})

app.listen(3023, () => console.log('Listening on port 3023'));