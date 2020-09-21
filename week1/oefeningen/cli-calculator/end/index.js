/**
 * CLI Calculator
 */

const state = require('./state.js');
const fs = require('fs');

// getting arguments
const args = process.argv;
const myArgs = args.splice(2);

// switch arguments
switch(myArgs[0]) {
  case "get":
    state.get().then((data) => console.log(data));
    break;
  case "add":
    state.add();
    break;
  case "subtract":
    state.subtract();
    break;
  case "reset":
    state.reset();
    break;
  default:
    console.log('no args were found');
    break;
}