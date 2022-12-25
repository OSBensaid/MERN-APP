const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all the fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    // Hash password
    const hashSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, hashSalt);

    // Create a new User
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      res.status(201).json({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add all the fields");
    }

    // Check if user exists
    const existUser = await User.findOne({ email });

    // Compare the password
    if (existUser && (await bcrypt.compare(password, existUser.password))) {
      res.status(201).json({
        _id: existUser.id,
        name: existUser.name,
        email: existUser.email,
        token: generateToken(existUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data 2");
    }
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  const currentUser = req.user;
  res.status(200).json(currentUser);
};

const usersList = async (req, res) => {
  res.status(200).send("All Users");
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  usersList,
};
