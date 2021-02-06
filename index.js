const express = require("express");

const app = express();

require("./routes/reports")(app);

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});

module.exports = app;
