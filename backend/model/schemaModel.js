const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  inputJson: {
    type: Object,
    required: [true, 'Input JSON is required']
  },
  outputJsonSchema: {
    type: Object,
    required: [true, 'Output JSON Schema is required']
  },
  answerText: {
    type: String,
    required: [true, 'Answer text is required']
  }
});

const Scheme = mongoose.model('Scheme', schemeSchema);

module.exports = Scheme;
