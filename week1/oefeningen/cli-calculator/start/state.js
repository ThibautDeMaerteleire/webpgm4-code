const DEFAULT_STATE = 10;
let state=DEFAULT_STATE;

const get = () => state;
const add = () => ({ state: state+=1 })
const subtract = () => ({ state: state-=1 })
const reset = () => ({ state: DEFAULT_STATE })

module.exports = {
  get,
  add,
  subtract,
  reset
}