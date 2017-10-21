const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time_sent: {
    type: Number,
    required: true,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  readed: {
    type: Boolean,
    default: false,
  }
}, {
  _id : false,
  __v: false
});

module.exports = mongoose.model("Message", MessageSchema);
