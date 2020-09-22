'use strict';

async function deserializeTodo(request) {
  const { todo } = request.body;

  // validate if we have a todo in the body
  if (todo == null)
    throw new Error('todo not set');

  // trim all the white/none characters in our string
  if (todo.description != null)
    todo.description = todo.description.trim();

  // check if we have a description
  if (todo.description == null || todo.description.length === 0)
    throw new Error('description not set');

  // return the deserialized todo
  return todo;
};

module.exports = deserializeTodo;