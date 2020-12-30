const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: Date,
  zipCode: String,
  avatar: String,
  carYear: String,
  carMake: String,
  carModel: String,
  followers: [
    {
      createdAt: Date,
      username: String,
    }
  ]
});

module.exports = model('User', userSchema);