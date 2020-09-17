/**
 * A Simple Static File Server
 */

var fs = require('fs'),
    http = require('http');

// creating the file server
http.createServer(function (req, res) {
  fs.readFile(`${__dirname}/public/${req.url}`, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(8080);

// show that we are listening
console.log('Listening on port 8080...');