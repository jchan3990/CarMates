const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: Date,
  avatar: String,
  carYear: String,
  carMake: String,
  carModel: String
});

module.exports = model('User', userSchema);