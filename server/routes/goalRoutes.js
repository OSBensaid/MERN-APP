const express = require("express");
const {
  getGoals,
  updateGoal,
  deleteGoal,
  addGoal,
} = require("../controllers/goalController");

const router = express.Router();

router.route("/").get(getGoals).post(addGoal);
router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
