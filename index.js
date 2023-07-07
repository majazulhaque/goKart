const express = require("express");
const path = require("path");
const port = 8000;
const app = express();

const db = require("./config/mongoose");


// Run the server on port 8000
app.listen(port, function (err) {
  if (err) {
    console.log(`Error: ${err}`);
  }
  console.log(`Server is set up at port: ${port}`);
});

repl.startREPL();
