'use strict';

const deserializeTodo = require('./deserializeTodo');

async function addTodo(todo, request, response) {
  try
  {
    const { description } = await deserializeTodo(request, response);
    const newTodo = await todo.add(description);
    response.status(201); // https://httpstatuses.com/
    response.json({ todo: newTodo });
  }
  catch({ message })
  {
    response.status(500);
    response.json({ error: message });
  }
};

module.exports = addTodo;