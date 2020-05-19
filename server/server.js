const express = require("express");
const jwt = require("./middleware/jwt");
const errorHandler = require("./middleware/error-handler");
const cors = require("cors");
const app = express();
const httpLogger = require("./logs/util/httpLogger");
app.use(httpLogger);
const config = require("./config");
app.use(cors());
app.use(express.json());
app.use(jwt());
require("./routes")(app);
const mongoose = require("./config/database"); //database configuration

// connection to mongodb
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error

// handle errors
app.use(errorHandler);

app.get("/favicon.ico", function(req, res) {
  res.sendStatus(204);
});

app.listen(config.port, function() {
  console.log("Node server listening on port ", config.port);
});
