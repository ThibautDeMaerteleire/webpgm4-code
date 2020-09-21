/**
 * Keep track of our state
 */

const JsonFile = require('./JsonFile.js');
const jsonFile = new JsonFile('./state.json');
const DEFAULT_STATE = 10;

/**
 * A helper function, so we know what we are doing
 * @param {*} oldState
 * @param {*} newState
 */
const debug = (oldState, newState) => {
  console.log(`Old value is: ${oldState}`);
  console.log(`New value is: ${newState}`);
}

/**
 * Reading the JSON file
 */
const get = async () => {
  return (await jsonFile.read()).state;
}

/**
 * Adding 1 to our state
 */
const add = async () => {
  const oldState = await get();
  await jsonFile.write({ state: oldState + 1 });
  const newState = await get();
  debug(oldState, newState);
}

/**
 * Subtracting 1 from our state
 */
const subtract = async () => {
  const oldState = await get();
  await jsonFile.write({ state: oldState - 1 });
  const newState = await get();
  debug(oldState, newState);
}

/**
 * Resetting the state
 */
const reset = async () => {
  const oldState = await get();
  await jsonFile.write({ state: DEFAULT_STATE });
  const newState = await get();
  debug(oldState, newState);
}

module.exports = {
  get,
  add,
  subtract,
  reset
}