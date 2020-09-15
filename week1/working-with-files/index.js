/**
 * Working With Files
 */

const fs = require('fs');
const { parse } = require('path');

/*
// reading a file
fs.readFile('./assets/file.txt', 'utf8', (err, data) => {
  // check if we have an error
  if(err) throw err;

  // check what we have
  // console.log('test', data);

  // add something to data
  data += "\nA new line of text";

  // appending something to a file
  fs.writeFile('./assets/file.txt', data, (err) => {
    if(err) throw err;
  });
});*/


/**
 * Using NodeJS as CLI
 */

const args = process.argv;
const usableArgs = args.slice(2);
console.log(usableArgs);

// import state
const state = require('./state.js');

if(usableArgs.length < 1) {
  throw new Error('Please enter at least one argument.');
}

// get the command
const command = usableArgs[0];

// switch through commands
/*switch(command) {
  case "get":
    console.log(JSON.stringify(state.get()));
    break;
  case "add":
    console.log(JSON.stringify(state.add()));
    break;
  case "subtract":
    console.log(JSON.stringify(state.subtract()));
    break;
  case "reset":
    state.reset();
  default:
    throw new Error('Command not supported');
}*/

switch(command) {
  case "get":
    fs.readFile('./assets/store.json', 'utf8', (err, data) => {
      if(err) throw err;
      console.log(data);
    });
    break;
  case "add":
    fs.readFile('./assets/store.json', 'utf8', (err, data) => {
      if(err) throw err;
      const parsed = JSON.parse(data);
      parsed.state++;
      fs.writeFile('./assets/store.json', JSON.stringify(parsed), (err) => {
        if(err) throw err;
      })
    });
    break;
  case "subtract":
    fs.readFile('./assets/store.json', 'utf8', (err, data) => {
      if(err) throw err;
      const parsed = JSON.parse(data);
      parsed.state--;
      fs.writeFile('./assets/store.json', JSON.stringify(parsed), (err) => {
        if(err) throw err;
      })
    });
    break;
  case "reset":
    fs.writeFile('./assets/store.json', JSON.stringify({state:10}), (err) => {
      if(err) throw err;
    });
  default:
    throw new Error('Command not supported');
}

