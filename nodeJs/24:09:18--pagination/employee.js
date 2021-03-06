var express = require('express');
var app = express();
app.use(express.json());
var bodyParser = require('body-parser');
const Employee = require('./empSchema');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var async = require('async');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/employee');
var db = mongoose.connection;

db.once('open', function() { console.log("Connected to MongoDb"); })

db.on('error', function(err) { console.log(err); });

app.post('/newEmployee', function(req, res) {
    console.log("calling post method");
    empName = req.body.empName;
    console.log("company name=" + empName);
    let newEmployee = new Employee();

    newEmployee.empName = empName;
    newEmployee.address = req.body.address;
    newEmployee.country = req.body.country;
    newEmployee.state = req.body.state;
    newEmployeecity = req.body.city;
    newEmployee.status = "activated";

    async.series([
        function(callback) {
            Employee.find({ "empName": empName }, function(err, data) {
                console.log("data=" + JSON.stringify(data));
                if (err) {
                    console.log(err);
                } else if (data.length !== 0) {
                    callback("employee already exist or status is dactivate");
                } else {
                    callback();
                }
            })
        },
        function(callback) {
            newEmployee.save(function(err, data) {
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
});

app.get('/employee', function(req, res) {

    var order = req.query.order;
    console.log("order=" + order);

    var pageNo = req.query.pageNo;
    console.log("order=" + order);

    async.series([
            function(callback) {
                Employee.paginate({}, { page: pageNo, limit: 10, sort: { empName: order || 'asc' } }, function(err, result) {
                    console.log("result=" + result);
                    callback(null, result)
                });
            }
        ],
        function(error, Data) {
            if (error) {
                res.send(error);
            } else {
                console.log("data=" + Data);
                res.send(Data);
            }
        })
});

app.get('/employee/:country', function(req, res) {
    console.log("calling get by country_name ");

    var country = req.params.country;
    console.log("country_name=" + country);
    async.series([
        function(callback) {
            Employee.aggregate([{ $match: { "country": country } }, { $match: { "status": "activated" } }, { $group: { "_id": "$state" } }], function(err, data) {
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

app.get('/employee/:department', function(req, res) {
    console.log("calling get by department_name ");

    var department = req.params.department;
    console.log("department_name=" + department);

    async.series([
        function(callback) {
            Employee.aggregate([{ $match: { "department": department } }, { $count: "department" }], function(err, data) {
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

app.get('/employee', function(req, res) {
    console.log("get by find pagenation");
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    var sort = req.query.sort;

    var query = {};
    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response)
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
    query.sort = { "empName": sort || asc };
    Employee.find({ "status": "activated" }, {}, query, function(err, data) {

        if (err) {
            response = { "error": true, "message": "Error fetching data" };
        } else {
            response = { "employee": data };
            res.json(response);
        }
    });
});

app.get('/employeeAggregate', function(req, res) {
    console.log("get by find pagenation");
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    var order = req.query.sort;

    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response)
    }
    Employee.aggregate([{ $match: { "status": "activated" } }, { "$skip": size * (pageNo - 1) }, { "$limit": size || 10 }, { "$sort": { "empName": order || 'asc' } }], function(err, data) {
        if (err) {
            response = { "error": true, "message": "Error fetching data" };
        } else {
            response = { "employee": data };
            res.json(response);
        }
    });
})
app.listen(3029, () => console.log('Listening on port 3029'));