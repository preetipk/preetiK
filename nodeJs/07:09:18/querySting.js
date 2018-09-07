const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true);

    const path = parseUrl.pathname, query = parsedUrl.query;
    const method = req.method;

    res.end("hello world\n");

    console.log(`Request received on: ${path} + method: ${method} + query: 
    ${JSON.stringify(query)}`);
    console.log('query: ', query);
  });


  server.listen(3000, () => console.log("Server running at port 3000"));