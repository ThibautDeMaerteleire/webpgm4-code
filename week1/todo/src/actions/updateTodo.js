'use strict';

const deserializeTodo = require('./deserializeTodo');

async function updateTodo(todo, request, response) {
  try
  {
    const { description } = await deserializeTodo(request, response);
    const id = request.params.id;
    const updatedTodo = await todo.update(id, description);
    response.status(200); // https://httpstatuses.com/
    response.json({ todo: updatedTodo });
  }
  catch({ message })
  {
    response.status(500);
    response.json({ error: message });
  }
};

module.exports = updateTodo;