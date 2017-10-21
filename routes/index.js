const express = require("express");
const router = express.Router();

const MessageRoute = require("./message");

router.use("/api", MessageRoute);

module.exports = router;