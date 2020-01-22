const http = require('http');
const actions = require('./actions');
const port = 8080;
const host = '127.0.0.1';

const requestListener = function (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/JSON');
  
  if (req.url === '/add' && req.method === 'POST') {
    let body = '';
    req.on('data', function (data) {
      body = data;
    });
    req.on('end', function () {
      res.end(actions.addNewUser(body));
   
    });
  }
  if (req.url === '/delete' && req.method == 'POST') {
    let body = '';
    req.on('data', function (data) {
      body = data;
    });
    req.on('end', function () {
      res.end(actions.deleteUser(body));
    });
  }
  if (req.url === '/view' && req.method == 'GET') {
    let body = '';
    req.on('data', function (data) {
      body = data;
    });
    req.on('end', function () {
      res.end(actions.viewUser(body));
    });
  }
  if (req.url === '/update' && req.method == 'POST') {
    let body = '';
    req.on('data', function (data) {
      body = data;
    });
    req.on('end', function () {
      res.end(actions.updateUser(body));
    });
  }
}

const server = http.createServer(requestListener);
server.listen(8080, () => {
  console.log(`Server is running on ${host}:${port}....`);
});
