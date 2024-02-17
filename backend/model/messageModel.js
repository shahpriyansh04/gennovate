const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: [true, 'Chat ID is required']
  },
  message: {
    question: {
      type: String,
      required: [true, 'Question is required']
    },
    answer: {
      type: String,
      required: [true, 'Answer is required']
    }
  },
  responseTime: {
    type: Date,
    default: Date.now() // Set default value to current time
  },
  person: {
    type: String,
    required: [true, 'Person is required'],
    enum: ['user', 'ai'] // Allow only 'user' and 'ai' as values
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
