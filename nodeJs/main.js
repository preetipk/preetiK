// console.log("hello");
var http = require("http");

http.createServer(function (request, response) {

 
   response.writeHead(200, {'Content-Type': 'text/plain'});
   response.write("Hello Everyone\n");
   
   // Send the response body
   response.end('Welcome to Qliktag\n');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');