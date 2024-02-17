const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Chat name is required']
  },
  dateCreated: {
    type: Date,
    default: Date.now // Set default value to current time
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  }
});
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
