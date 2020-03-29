const express = require("express");
const compression = require("compression");
const path = require("path");

const app = express();

app.use(compression());
app.use(express.static("public"));

app.listen(8080);

console.log("server running on http://localhost:8080");
