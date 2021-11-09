const http = require("http");
const PORT = 8080;

// a function which handles requests and sends response
const requestHandler = function(request, response) {
  console.log('In requestHandler:'); // NEW LINE
  if (request.url === '/' || request.url === "") {
    console.log(response.statusCode)
    response.end(`Welcome`)
  }
  else if (request.url === '/urls') {
    console.log(response.statusCode)
    response.end(`some URLs`)
  } 
  else {
    // console.log(response);
    response.statusCode = 404;
    console.log(response.statusCode);
    response.end(`404 Page Not Found`);
  }
  // response.end(`Requested Path: ${request.url} Request Method: ${request.method}`);
};

const server = http.createServer(requestHandler);
console.log('Server created'); // NEW LINE

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});

console.log('Last line (after .listen call)'); // NEW LINE
