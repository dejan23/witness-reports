const { response } = require("express");
const Reports = require("../controllers/reports");

module.exports = function (app) {
  app.get("/api/reports", Reports.fetchReports);
  app.get("/*", (req, res) =>
    res.send({
      message: "Route does not exist, try http://localhost:3000/api/reports",
    })
  );
};
