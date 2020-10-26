/**
 * Todos reducer
 */

import { ADD_TODO } from '../actionTypes';

const initialState = {
  todos: []
}

const todosReducer = (state=initialState, action) => {
  switch(action.type) {
    case ADD_TODO: {
      const { todo } = action.payload;
      return {
        ...state,
        todos: [ ...state.todos, todo ]
      }
    }
    default:
      return state
  }
}

export default todosReducer;