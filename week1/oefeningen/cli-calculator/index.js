/**
 * CLI Calculator
 */

const state = require('./state.js');

// getting arguments
const args = process.argv;
const myArgs = args.splice(2);

// switch arguments
switch(myArgs[0]) {
  case "get":
    console.log(state.get());
    break;
  case "add":
    console.log(state.add());
    break;
  case "subtract":
    console.log(state.subtract());
    break;
  case "reset":
    console.log(state.reset());
    break;
  default:
    console.log('no args were found');
    break;
}