const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: Date,
  city: String,
  state: String,
  country: String,
  geocode: String,
  avatar: String,
  carYear: String,
  carMake: String,
  carModel: String,
  followers: [
    {
      createdAt: Date,
      username: String,
    }
  ],
  following: [
    {
      createdAt: Date,
      username: String,
    }
  ]
});

module.exports = model('User', userSchema);