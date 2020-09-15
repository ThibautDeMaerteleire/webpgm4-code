/**
 * Rest API with Express
 */

const PORT = 8080;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// config the body parser
app.use(bodyParser.json());

// simple get
app.get('/', (req, res) => {
  res.send({ title: "A new beginning" });
});

// simple post
app.post('/', (req, res) => {
  console.log(`Posting ${req.body.title}`);
  res.send({ status: "success" });
});

// simple put
app.put('/:id', (req, res) => {
  console.log(`Changing the id of ${req.params.id} with ${req.body.title}`);
  res.send({ status: "success" });
})

// simple delete
app.delete('/:id', (req, res) => {
  console.log(`Deleting id ${req.params.id}`);
  res.send({ status: "success" });
})

app.listen(PORT, error => {
  if(error) return console.log(error);
  console.log(`Server started on http://localhost:${PORT}`);
});