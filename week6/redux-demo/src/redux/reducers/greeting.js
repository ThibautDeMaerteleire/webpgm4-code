/**
 * Greeting Reducer
 */

import { GREET_ME } from '../actionTypes';

const initialState = {
  text: ''
}

const greetingReducer = (state=initialState, action) => {
  switch(action.type) {
    case GREET_ME: {
      const { name } = action;
      return { ...state, text: `Welcome ${name}!` }
    }
    default:
      return state
  }
}

export default greetingReducer;