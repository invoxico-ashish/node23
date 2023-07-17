const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
mongoose
  .connect("mongodb://localhost:27017/MERN-23", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Databse is Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const UsrSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  phone: {
    type: Number,
    // required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
UsrSchema.methods.generateToken = async function () {
  try {
    const userToken = jwt.sign(
      { _id: this.id.toString() },
      "dfqgh8ugwdghwd80gqdghqw8ubqufbhoibcqviowfhcq9iwhfquo"
    );
    this.tokens = this.tokens.concat({ token: userToken });
    console.log(this.id);
    await this.save();
    return userToken;
  } catch (err) {
    console.log(err);
  }
};

UsrSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const UserModel = mongoose.model("userDetails", UsrSchema);
module.exports = UserModel;
