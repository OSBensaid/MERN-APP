const Goal = require("../models/goalModel");

const getGoals = async (req, res) => {
  // res.status(200).send("all goals");
  // res.status(200).json({ message: "all goals" });
  const goalsList = await Goal.find();
  res.status(200).json(goalsList);
};

const addGoal = async (req, res) => {
  if (!req.body.text) {
    // res.status(400).json({ message: "Please enter the text" });
    res.status(400);
    throw new Error("Please enter a text");
  }

  const newGoal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json(newGoal);
};

const updateGoal = async (req, res) => {
  const existedGoal = await Goal.findById(req.params.id);
  if (!existedGoal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const updatedCoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedCoal);
};

const deleteGoal = async (req, res) => {
  const existedGoal = await Goal.findById(req.params.id);
  if (!existedGoal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  await existedGoal.remove(req.params.id);
  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
};
