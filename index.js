const express = require("express");
const path = require("path");
const port = 8000;
const app = express();


// Add config mongoose
const db = require("./config/mongoose");


app.use(express.json());

// Add routes
app.use("/", require("./routes"));

app.use(express.urlencoded()); // middleware to analyse the req and convert into req.body.

// Run the server on port 8000
app.listen(port, function (err) {
  if (err) {
    console.log(`Error: ${err}`);
  }
  console.log(`Server is set up at port: ${port}`);
});

