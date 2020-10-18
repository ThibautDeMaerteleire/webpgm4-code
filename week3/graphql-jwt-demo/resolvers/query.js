/**
 * The Query Resolvers
 */

const { User } = require('../mongo/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server');

module.exports = {
  Query: {
    login: async (parent, { user }, context) => {
      // destructure the user
      const { email, password } = user;

      // validate if the user exists
      const foundUser = await User.findOne({ email: email });
      if(!foundUser) throw new Error('User does not exist.');

      // check if incoming password is equal
      const isEqual = bcrypt.compareSync(password, foundUser.password);
      if(!isEqual) throw new Error('Password is incorrect.');

      // create the webtoken
      const token = jwt.sign(
        { userId: foundUser._id, email: foundUser.email },
        process.env.TOKEN_SALT,
        { expiresIn: '1h' }
      );

      // return the auth data
      return {
        userId: foundUser.id,
        token
      }
    },

    users: (parent, params, context) => {
      if(context.userId === '') throw new AuthenticationError('Must authenticate!');
      else return User.find();
    },

    user: (parent, { id }, context) => {
      if(context.userId === '') throw new AuthenticationError('Must authenticate!');
      else return User.findOne({ _id: id });
    }
  },
}