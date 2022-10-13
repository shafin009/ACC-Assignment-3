const {
  findUserByEmailService,
  signUpService,
} = require("../services/user.service");
const generateError = require("../utils/generateError");
const generateToken = require("../utils/generateToken");

exports.signUp = async (req, res) => {
  try {
    const existingUser = await findUserByEmailService(req.body.email);
    if (existingUser) {
      return res.status(400).json({ error: "User Already Exists" });
    }
    const user = await signUpService(req.body);
    const { password: pwd, ...others } = user.toObject();
    const token = generateToken(user);
    res.status(201).json({
      message: "User created successfully",
      user: others,
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: generateError(error),
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ error: "Please provide email and password" });
    }
    const user = await findUserByEmailService(email);
    if (!user) {
      return res.status(401).json({ error: "No user found." });
    }
    const isPasswordCorrect = await user.comparePassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Wrong Password" });
    }
    if (!user.status === "active") {
      return res
        .status(401)
        .json({ error: `Account is not active. Its ${user.status}` });
    }
    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      message: "Logged in successfully",
      user: others,
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: generateError(error),
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await findUserByEmailService(email);
    if (!user) {
      return res
        .status(401)
        .json({ error: "User not found. This can be deleted" });
    }
    res.status(200).json({
      message: "User got successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: generateError(error),
    });
  }
};
