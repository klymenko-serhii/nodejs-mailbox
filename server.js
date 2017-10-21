const express = require("express");
const bodyParser = require("body-parser");

const errorHandler = require("./middlewares/errorHandler");

/* DB connect */
const db = require("./models/db");
db.connect();

const app = express();

app.use(express.static("apidoc"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/** Routes */
const routes = require("./routes");
app.use("/", routes);

app.listen(process.env.PORT, process.env.HOST);

app.use(errorHandler);

console.log(`Running on http://${process.env.HOST}:${process.env.PORT}`);
