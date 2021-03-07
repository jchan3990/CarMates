const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const {Client} = require("@googlemaps/google-maps-services-js");
const axios = require('axios');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators.js')
const { SECRET_KEY, gMapsKey } = require('../../config.js');
const User = require('../../server/model/User.js');
const checkAuth = require('../../util/check-auth.js')

const generateToken = user => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
}

module.exports = {
  Query: {
    async getUser(_, { username }) {
      try {
        const user = await User.findOne({"username": username})
        if (user) {
          return user;
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    getAllUsers: async () => {
      try {
        const users = await User.find().limit(20);
        if (users) {
          return users;
        } else {
          throw new Error('Failed to get users');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    getUserFollowers: async (_, { username }) => {
      try {
        const user = await User.findOne({ 'username': username });
        if (user) {
          return user.followers;
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async login(_, { username, password }) {
      const {errors, valid} = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    },
    async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword, city, state, country, avatar, carYear, carMake, carModel }
      },
      context,
      info
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // Make sure user doesn't already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken'
          }
        })
      }
      // hash password and create auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date(),
        city,
        state,
        country,
        avatar,
        carYear,
        carMake,
        carModel
      })

      const res = await newUser.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token
      };
    },
    followUser: async (_, { username }, context) => {
      const currUser = checkAuth(context);
      const toFollow = await User.findOne({ 'username': username });
      const following = await User.findOne({ 'username': currUser.username })

      if (toFollow) {
        if (toFollow.followers.find(follower => follower.username === currUser.username)) {
          // Already following --> stop following
          toFollow.followers = toFollow.followers.filter(follower => follower.username !== currUser.username);
          following.following = following.following.filter(user => user.username !== username);
        } else {
          // Not following --> follow
          toFollow.followers.push({
            username: currUser.username,
            createdAt: new Date()
          })
          following.following.push({
            username: username,
            createdAt: new Date()
          })
        }

        await toFollow.save();
        await following.save();
        return toFollow;
      } else {
        throw new Error('User not found');
      }
    }
  }
}