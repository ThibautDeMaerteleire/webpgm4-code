/**
 * The ToDo object definition
 */

const fs = require('fs');
const ToDoItem = require('./ToDoItem');

class ToDo {
  constructor(filename) {
    this.filename = filename;
  }

  /**
   * Add a new todo
   * @param {*} todos
   */
  async add(description) {
    // get the todo list
    const todos = await this.get();

    // push in our existing array
    todos.push(new ToDoItem(description));

    // save the list
    await this.save(todos);

    // return the new added todo
    return todo;
  }

  /**
   * Update an existing ToDo
   *
   * @param {*} id
   * @param {*} description
   */
  async update(id, description) {
    const todos = await this.get();
    const todo = todos.find(t => t.id === id);
    if(todo == null) {
      const e = new Error(`ToDo with ID ${id} does not exist`);
      throw e;
    }
    todo.description = description;
    await this.save(todos);
    return todo;
  }

  /**
   * Delete a specific todo
   * @param {*} id
   */
  async delete(id) {
    const todos = await this.get();
    const filteredTodos = todos.filter(t => t.id !== id);
    return this.save(filteredTodos);
  }

  /**
   * Get the todo list
   */
  get() {
    return new Promise(resolve => {
      fs.readFile(this.filename, 'utf8', (e, data) => {
        if (e) return resolve([]);
        const jsonData = JSON.parse(data);
        const castedObjects = jsonData.map((obj) => Object.assign(new ToDoItem, obj));
        return resolve(castedObjects);
      });
    });
  }

  /**
   * Save the todos
   */
  save(todos) {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        this.filename,
        JSON.stringify(todos, null, 2),
        e => e === null ? resolve() : reject(e)
      )
    });
  }
}

module.exports = ToDo;