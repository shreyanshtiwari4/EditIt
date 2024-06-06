const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatarURL: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/666/666201.png" // Default avatar URL
  },
  collaboratedDocuments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
