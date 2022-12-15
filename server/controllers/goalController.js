const getGoals = async (req, res) => {
  // res.status(200).send("all goals");
  res.status(200).json({ message: "all goals" });
};

const addGoal = async (req, res) => {
  if (!req.body.text) {
    // res.status(400).json({ message: "Please enter the text" });
    res.status(400);
    throw new Error("Please enter a text");
  }
  res.status(200).json({ message: "add new goal" });
};

const updateGoal = async (req, res) => {
  res.status(200).json({ message: `update goal ${req.params.id}` });
};

const deleteGoal = async (req, res) => {
  res.status(200).json({ message: `delete goal ${req.params.id}` });
};

module.exports = {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
};
