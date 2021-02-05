const Reports = require("../controllers/reports");

module.exports = function (app) {
  app.get("/api/reports", Reports.fetchReports);
};
