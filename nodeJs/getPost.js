var http = require("http");
var server =http.createServer(function(request,response){

    var fs = require("fs");

    if(request.method === "GET"){
        console.log("calling get method");
        response.writeHead(200, {'Content-Type': 'text/html'});
        //PIPE clubes the data with response and display it
        fs.createReadStream("/Users/preeti/Desktop/app/webdir/nodeJs/form.html","UTF-8").pipe(response)
    }
    else if(request.method === "POST"){
        console.log("calling post method");
        //a variable to store data coming from request
        var data = "";
        request.on("data",function(obj){
            data += obj; 
        });

        request.on("end",function(){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    }
}).listen(3000);