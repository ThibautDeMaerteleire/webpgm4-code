'use strict';

async function getTodos(todo, request, response) {
  try
  {
    const todos = await todo.get();
    response.json({ todos });
    response.end();
  }
  catch({ message })
  {
    response.status(500);
    response.json({ error: message });
  }
};

module.exports = getTodos;