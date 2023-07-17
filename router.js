const express = require("express");
const router = express.Router();
const user = require("./Config/Database");
const bcrypt = require("bcryptjs");

// router.get("/", (req, res) => {
//   res.render("index");
// });

router.post("/register", async (req, res) => {
  //   res.send("hi");
  // const salt = await bcrypt.genSalt(10);
  // let secPass = await bcrypt.hash(req.body.password, salt);
  // let conSecPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const { name, email, password, phone, confirmpassword } = req.body;

    const data = new user(req.body);
    console.log(data.password);
    if (data.password === data.confirmpassword) {
      const validemail = await user.findOne({ email: data.email });
      if (validemail) {
        res.send("already exist");
      }
      const token = await data.generateToken();
      console.log(`this is token: ${token}`);

      res.cookie("jwt", token);

      const saveData = await data.save();
      res.send(saveData);
    } else {
      res.status(400).json({
        success: false,
        message: "Password Not match",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const checkemail = req.body.email;
    const password = req.body.password;
    const DBdata = await user.findOne({ email: checkemail });
    // console.log(password);
    // console.log(DBdata.password);
    const isMatch = await bcrypt.compare(password, DBdata.password);

    console.log(isMatch);
    if (password) {
      // const token = await DBdata.generateToken();
      // res.cookie("jwt", token);

      res.status(200).json({
        success: true,
        message: "SuccessFull",
        DBdata,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Please enter valid data",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
