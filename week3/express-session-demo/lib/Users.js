/**
 * A Users Class
 */

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const bcrypt =  require('bcrypt');

class Users {
  constructor(filepath) {
    this.filepath = filepath;
    this.salt = process.env.PASSWORD_SALT;
  }

  getUsers() {
    this.validateUsersFile();
    return JSON.parse(fs.readFileSync(this.filepath));
  }

  getUser(id) {
    this.validateUsersFile();
    if(!this.userExists(email)) throw new Error('User does not exist.');
    const users = this.getUsers();
    return users.filter((user) => user.id === id).pop();
  }

  getUserByEmail(email) {
    this.validateUsersFile();
    const users = this.getUsers();
    const filterdUsers = users.filter((user) => user.email === email);
    if(filterdUsers.length === 0) throw new Error('User does not exist.');
    return filterdUsers.pop();
  }

  addUser(email, password) {
    // validate the users file
    this.validateUsersFile();

    // get the current users
    const users = this.getUsers();

    // validate if the users exists
    if(this.userExists(email)) throw new Error('User already exists');

    // create a new ID
    const id = uuidv4();

    // hash the password with bcrypt
    const encryptedPassword = bcrypt.hashSync(password, 12);

    // push the user into our array
    users.push({ id, email, password: encryptedPassword });

    // write the file
    fs.writeFileSync(this.filepath, JSON.stringify(users));
  }

  login(email, password) {
    // validate the users file
    this.validateUsersFile();

    // get the current users
    const user = this.getUserByEmail(email);

    // check if the password is correct
    if(!bcrypt.compareSync(password, user.password)) {
      throw new Error('The password is not correct!');
    }

    // return the user
    return user.id;
  }

  userExists(email) {
    this.validateUsersFile();
    return this.getUsers().filter((user) => user.email === email).length > 0;
  }

  validateUsersFile() {
    if(!fs.existsSync(this.filepath)) fs.writeFileSync(this.filepath, JSON.stringify([]));
  }
}

module.exports = Users;