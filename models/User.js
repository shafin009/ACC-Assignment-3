const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      minLength: [2, "First Name should be at least 2 characters long"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      minLength: [2, "Last Name should be at least 2 characters long"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Valid email is required"],
      unique: true,
    },
    // because you said don't make it complicated thats why I made it simple
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
    contactNumber: {
      type: Number,
      validate: [validator.isMobilePhone, "Valid phone number is required"],
    },
    role: {
      type: String,
      enum: ["candidate", "hiring-manager", "admin"],
      default: "candidate",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
      required: true,
    },
    passwordResetAt: Date,
    passwordResetToken: Date,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (password, hash) {
  return await bcrypt.compare(password, hash);
};

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
