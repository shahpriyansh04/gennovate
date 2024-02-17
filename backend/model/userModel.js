const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  birthday: Date,
  created_at: Date,
  email_addresses: [
    {
      email_address: String
    }
  ],
  external_accounts: [Object],
  external_id: String,
  first_name: String,
  gender: String,
  id: String,
  image_url: String,
  last_name: String,
  last_sign_in_at: Date,
  object: String,
  password_enabled: Boolean,
  phone_numbers: [Object],
  two_factor_enabled: Boolean,
  updated_at: Date,
  username: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
