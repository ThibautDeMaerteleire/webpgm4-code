'use strict';

const deserializeTodo = require('./deserializeTodo');

async function deleteTodo(todo, request, response) {
  try
  {
    const id = request.params.id;
    await todo.delete(id);
    response.status(204); // https://httpstatuses.com/
    response.end();
  }
  catch({ message })
  {
    response.status(500);
    response.json({ error: message });
  }
};

module.exports = deleteTodo;