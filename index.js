const http = require('http');
const actions = require('./actions');
const port = 8080;
const host = '127.0.0.1';
let body = '';
const requestListener = function (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/JSON');
  req.on('data', function (data) {
    body += data;
  });
  if (req.url === '/add') {
    req.on('end', function () {
      res.end(actions.addNewUser(body));
    });
  }
  if (req.url === '/delete') {
    req.on('end', function () {
      res.end(actions.deleteUser(body));
    });
  }
  if (req.url === '/view') {
    req.on('end', function () {
      res.end(actions.viewUser(body));
    });
  }
  if (req.url === '/update') {
    req.on('end', function () {
      res.end(actions.updateUser(body));
    });
  }
}

const server = http.createServer(requestListener);
server.listen(8080, () => {
  console.log(`Server is running on ${host}:${port}....`);
});
