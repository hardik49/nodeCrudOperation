const http = require('http');
const actions = require('./actions');
const port = 8080;
const host = '127.0.0.1';

const requestListener = function (req, res) {
  let body = '';
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/JSON');
  switch (req.url, req.method) {
    case ('/add', 'POST'):
      req.on('data', function (data) {
      body = data;
    });
    req.on('end', function () {
      res.end(actions.addNewUser(body));
   
    });
    break;

    case ('/update', 'POST'):
      body = '';
      req.on('data', function (data) {
        body = data;
      });
      req.on('end', function () {
        res.end(actions.updateUser(body));
      });
      break;

    case ('/delete', 'POST'):
      body = '';
      req.on('data', function (data) {
        body = data;
      });
      req.on('end', function () {
        res.end(actions.deleteUser(body));
      });
      break;
    
    case ('/view', 'GET'):
      body = '';
      req.on('data', function (data) {
        body = data;
      });
      req.on('end', function () {
        res.end(actions.viewUser(body));
      });
      break;
    default:
      return 'Invalid Input Entered!';
  } 
}

const server = http.createServer(requestListener);
server.listen(8080, () => {
  console.log(`Server is running on ${host}:${port}....`);
});
