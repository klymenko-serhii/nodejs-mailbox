const mongoose   = require("mongoose");
mongoose.Promise = Promise;

const dbUrl = `mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

function connect() {
  mongoose.connect(dbUrl, { useMongoClient: true })
    .then(() => console.log("database connected"))
    .catch(err => console.log(`connection error: ${err}`));
}

module.exports = { connect };
