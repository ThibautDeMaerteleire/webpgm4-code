/**
 * The Query Resolvers
 */

const { User } = require('../mongo/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

    doingSomething: (parent, params, context) => {
      if(context.userId === '') return { status: "User is not allowed!" }
      else return { status: "User is allowed! "}
    }
  },
}