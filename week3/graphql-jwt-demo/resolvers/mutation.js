/**
 * The Mutation Resolvers
 */

const { User } = require('../mongo/models');
const bcrypt = require('bcrypt');

module.exports = {
  Mutation: {
    register: async (parent, { user }) => {
      // destructure user
      const { email, password } = user;

      // validate if the user exists
      const foundUser = await User.findOne({ email });
      if(foundUser) throw new Error('User already exists.')

      // create hash
      const hashedPassword = bcrypt.hashSync(password, 12);

      // create new user
      const newUser = await User.create({
        email,
        password: hashedPassword
      });

      // reset the password for security issues
      newUser.password = null;

      // return the user
      return newUser;
    }
  }
}