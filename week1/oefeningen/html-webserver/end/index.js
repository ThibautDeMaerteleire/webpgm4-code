/**
 * HTML Webserver
 */

const express = require('express');
var fs = require('fs');
var path = require('path');
const bodyParser = require('body-parser');
var { PORT } = require('./consts.js');

// create the express app
const app = express();

// adding middleware
app.use(bodyParser.json());

/**
 * Serve file statically
 */

app.use('/public', express.static('./public'));

/**
 * Serve Some Data
 */

app.get('/navigation', (req, res) => {
  res.send({
    data: [{
      text: "Homepage",
      link: "/"
    }, {
      text: "About Us",
      link: "/about-us"
    }, {
      text: "Contact",
      link: "/contact"
    }]
  });
});

/**
 * Routes
 */

app.get('/', (req, res) => res.sendFile(path.join(`${__dirname}/public/pages/index.html`)));
app.get('/about-us', (req, res) => res.sendFile(path.join(`${__dirname}/public/pages/about-us.html`)));
app.get('/contact', (req, res) => res.sendFile(path.join(`${__dirname}/public/pages/contact.html`)));

/**
 * Start the server
 */

app.listen(PORT, error => {
  if(error) return console.log(error);
  console.log(`Server started on http://localhost:${PORT}`);
});