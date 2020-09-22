/**
 * The ToDo Item object definition
 */

const { v4: uuidv4 } = require('uuid');

class ToDoItem {
  constructor(description) {
    this.description = description;
    this.id = uuidv4();
    this.done = false;
  }

  toggleDone() {
    this.done = !this.done;
  }
}

module.exports = ToDoItem;