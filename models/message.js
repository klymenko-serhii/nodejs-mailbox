const MessageSchema = require("./schemas/message");

module.exports = {
  getMessages(page, type, pagesize) {
    const query = type ? {
      [type]: true
    } : {};
    return MessageSchema.find(query).skip(page * pagesize).limit(pagesize);
  },

  getMessage(uid) {
    return MessageSchema.findOne({ uid });
  },

  archiveMessage(uid) {
    return MessageSchema.findOneAndUpdate({ uid }, {
      $set: { archived: true }
    });
  },

  readMessage(uid) {
    return MessageSchema.findOneAndUpdate({ uid }, {
      $set: { readed: true }
    });
  }
};
