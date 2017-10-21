const express = require("express");
const router = express.Router();

const authCheck = require("../middlewares/authCheck");
const MessageController = require("../controllers/message");

/** Get all messages */
router.get("/messages",
  authCheck,
  MessageController.validate("getMessages"),
  MessageController.getMessages
);

router.get("/message/:uid",
  authCheck,
  MessageController.validate("getMessage"),
  MessageController.getMessage
);

router.put("/message/:uid/archive",
  authCheck,
  MessageController.validate("archiveMessage"),
  MessageController.archiveMessage
);

router.put("/message/:uid/read",
  authCheck,
  MessageController.validate("readMessage"),
  MessageController.readMessage
);

module.exports = router;
