var express = require("express");
var cors = require("cors");
var app = express();

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "travel",
});

app.use(cors());

app.get("/api/attractions", function (req, res, next) {
  connection.query("SELECT * FROM attraction", function (err, results, fields) {
    console.log();
    res.json(results);
  });
});

app.get("/api/attractions/:id", function (req, res, next) {
  const id = req.params.id
  connection.query(
    "SELECT * FROM attraction WHERE id = ?",
    [id],
    function (err, results) {
      res.json(results[0]);
      console.log(results);
    }
  );
});

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
