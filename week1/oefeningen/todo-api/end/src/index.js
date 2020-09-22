/**
 * Our ToDo App
 */

// import external lib
const Express = require('express');
const app = new Express();

// configure the body parse to JSON
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// import internal lib
const ToDo = require('./ToDo.js');

// import CRUD actions
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
} = require('./actions');

// consts
const { FILENAME, PORT } = require('./consts');

// ------
// AUTHENTICATION MIDDLEWARE
// ------

function auth(req, resp, next) {
  const isAuth = true;
  if(isAuth) next();
  else {
    throw new Error('This man is not authenticated');
  }
}

// ------
// THE APP
// ------

// create the todo list
const todo = new ToDo(`./data/${FILENAME}`);

// get the todos
app.get('/todos', auth, (req, res) => { getTodos(todo, req, res) });

// create a new todo
app.post('/todos/add', (req, res) => { addTodo(todo, req, res) });

// update an existing todo
app.put('/todos/:id', (req, res) => { updateTodo(todo, req, res) });

// delete an existing todo
app.delete('/todos/:id', (req, res) => { deleteTodo(todo, req, res) });

// let's start listening
app.listen(PORT, error => {
  if (error) return console.error(error);
  console.log(`Server started on http://localhost:${PORT}`);
});