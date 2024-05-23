import mongoose from "mongoose";
import validator from "validator";
import brcypt from "bcryptjs";
import JWT from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
    },

    lastName: {
      type: String,
      require: [true, "Name is required"],
    },

    email: {
      type: String,
      require: [true, "E-mail is required"],
      unique: true,
      validate: validator.isEmail,
    },

    password: {
      type: String,
      require: [true, "Password is required"],
      minLength: [6, "Password length should be minimum 6 characters"],
      select: true,
    },

    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

//middleware. It is used for encrypting the password
userSchema.pre("save", async function () {
  if (!this.isModified) {
    return;
  }
  const salt = await brcypt.genSalt(10);
  this.password = await brcypt.hash(this.password, salt);
});

//compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const ismatch = await brcypt.compare(userPassword, this.password);
  return ismatch;
};

//this is used to create the tokens
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default mongoose.model("User", userSchema);
