const express = require("express");
const app = express();
const dotenv = require("dotenv");
const router = require("./router");
const bodyParser = require("body-parser")


app.use(express.json())
// app.use(express.urlencoded({extended:false}))
PORT = 8000;
dotenv.config();
app.use(bodyParser.json())
// app.set("view engine", "ejs ");
app.use(router);


app.listen(PORT, (err) => {
  if (!err) {
    console.log(`server is running ${PORT}`);
  } else {
    console.log(err);
  }
});
