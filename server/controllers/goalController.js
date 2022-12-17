const Goal = require("../models/goalModel");
const User = require("../models/userModel");

const getGoals = async (req, res) => {
  // res.status(200).send("all goals");
  // res.status(200).json({ message: "all goals" });
  const goalsList = await Goal.find({ user: req.user.id });
  res.status(200).json(goalsList);
};

const addGoal = async (req, res, next) => {
  try {
    if (!req.body.text) {
      // res.status(400).json({ message: "Please enter the text" });
      res.status(400);
      throw new Error("Please enter a text");
    }

    const newGoal = await Goal.create({
      text: req.body.text,
      user: req.user.id,
    });
    res.status(200).json(newGoal);
  } catch (error) {
    next(error);
  }
};

const updateGoal = async (req, res, next) => {
  try {
    const existedGoal = await Goal.findById(req.params.id);
    if (!existedGoal) {
      res.status(400);
      throw new Error("Goal not found");
    }

    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      res.status(401);
      throw new Error("User no found");
    }

    // Make sure the logged in user matches the goal user
    if (existedGoal.user.toString() !== currentUser.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const updatedCoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCoal);
  } catch (error) {
    next(error);
  }
};

const deleteGoal = async (req, res, next) => {
  try {
    const existedGoal = await Goal.findById(req.params.id);
    if (!existedGoal) {
      res.status(400);
      throw new Error("Goal not found");
    }

    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      res.status(401);
      throw new Error("User no found");
    }

    // Make sure the logged in user matches the goal user
    if (existedGoal.user.toString() !== currentUser.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    await existedGoal.remove(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
};
