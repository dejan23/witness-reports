const express = require("express");

const app = express();

require("./routes/reports")(app);

module.exports = app;

const start = async () => {
  app.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
  });
};

start();
