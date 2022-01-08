const express = require("express");
const { appendFile } = require("fs");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

app.listen(port, () => {
  console.log("connected");
});
