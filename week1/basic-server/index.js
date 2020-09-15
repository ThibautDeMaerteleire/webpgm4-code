/**
 * Our first nodejs application - A Basic Server
 */

/**
 * CowSay
 */

/*const cowsay = require('cowsay');
const cow = cowsay.say({
  text: "I love PGM...Cool",
  e: "- -"
});
console.log(cow);*/

/**
 * HTTP Server
 * https://www.youtube.com/watch?v=SwLdKeC8scE
 */

const http = require('http');
const port = 8080;

/**
 * Basic setup
 */

/* http.createServer((req, res) => {
  // console.log(req.url);
  res.write('<h1>Hello PGM!</h1>');
  res.end();
}).listen(port); */

/**
 * Basic Routing
 */

/* const route = (req, res) => {
  switch(req.url) {
    case "/":
      res.write("You have reached the root!");
      break;
    case "/contacts":
      res.write("You have reached the contact page!");
      break;
    default:
      res.writeHead(404);
      res.write("Don't know what you are talking about - 404");
  }
}

http.createServer((req, res) => {
  route(req,res);
  res.end();
}).listen(port);*/

/**
 * Sending out JSON
 */

http.createServer((req, res) => {
  const url = req.url;
  if(url === "" || url === "/")
  {
    // write the JSON header
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    // the object we want to send out
    const response = {
      message: "You have reached the root!"
    }

    // We call a built-in function `JSON.stringify` to convert the Javascript object into JSON and then we write it out like
    // before.
    res.write(JSON.stringify(response));

    // end the pain
    res.end();
  }
}).listen(port);


console.log(`Server is listening on port ${port}`);