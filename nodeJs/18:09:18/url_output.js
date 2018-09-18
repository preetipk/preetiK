//get all users
localhost: 3023 / companies

    [[
    { "_id": "5ba0aac9329d8192471b1a91", "company_name": "Qliktag", "address": "WTC", "country": "India", "state": "Maharashtra", "city": "Pune", "status": "activated" },
    { "_id": "5ba0c6ab329d8192471b3557", "company_name": "sama", "address": "Karve nagar", "country": "India", "state": "tamilnadu", "city": "Pune", "status": "activated" },
    { "_id": "5ba0cc7d60acdf04e20e3efa", "company_name": "express", "__v": 0, "address": "viman nagar", "city": "Panji", "country": "viman nagar", "state": null, "status": "activated" }
]]

//get users by company name as request params
localhost: 3023 / company / Qliktag

    [[{ "_id": "5ba0aac9329d8192471b1a91", "company_name": "Qliktag", "address": "WTC", "country": "India", "state": "Maharashtra", "city": "Pune", "status": "activated" }]]


//get users by company name as req params and state is query params
localhost: 3023 / companies / sama ? state = Maharashtra //if enter wrong state

data not found

localhost: 3023 / companies / sama ? state = tamilnadu //exact state

    [[{ "_id": "5ba0c6ab329d8192471b3557", "company_name": "sama", "address": "Karve nagar", "country": "India", "state": "tamilnadu", "city": "Pune", "status": "activated" }]]


//update 
localhost: 3023 / newCompany //if data already exist

company already exist or status is dactivate

localhost: 3023 / newCompany //if not exist

    [null, "data inserted successfully"]

//put by company name
ocalhost: 3023 / companyUpdates / wipro
company not exist in records or status is deactivate //if company not exist or status is deactive

localhost: 3023 / companyUpdates / sama //
    [null, "data with sama updated successfully"]

//put by state as query param
localhost: 3023 / companyUpdates ? state = Goa //
    [null, "data with Goa updated successfully"]

//delete
localhost: 3023 / companyDelete / sama //
    [null, "data with sama deleted successfully"]
    //data from database
    {
        "_id": ObjectId("5ba0c6ab329d8192471b3557"),
        "company_name": "sama",
        "address": "WTC",
        "country": "India",
        "state": "Maharashtra",
        "city": "Pune",
        "status": "deleted"
    }

d