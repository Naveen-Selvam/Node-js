const http = require('http');
const port = 3033;
const user = [
  { name: 'virat', age: 38 },
  { name: 'dhoni', age: 45 },
];
const server = http.createServer(function (request, response) {
  if (request.url === '/') {
    response.end('Welcome to the web server');
  } else if (request.url === '/about') {
    response.end('this is all about about page');
  } else if (request.url === '/user') {
    response.end(JSON.stringify(user));
  } else if (request.url === '/sys_time') {
    response.end(JSON.stringify({ value: new Date() }));
  } else {
    response.end('404 not found');
  }
});

server.listen(port, function () {
  console.log('server is running at', port);
});
