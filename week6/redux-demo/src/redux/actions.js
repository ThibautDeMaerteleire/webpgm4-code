/**
 * Actions
 */

import { ADD_TODO, GREET_ME } from './actionTypes';

export const addTodo = todo => ({
  type: ADD_TODO,
  payload: {
    todo
  }
});

export const GreetMe = name => ({
  type: GREET_ME,
  name
});