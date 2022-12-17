const express = require("express");
const {
  getGoals,
  updateGoal,
  deleteGoal,
  addGoal,
} = require("../controllers/goalController");
const { routeProtect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(routeProtect, getGoals).post(routeProtect, addGoal);
router
  .route("/:id")
  .put(routeProtect, updateGoal)
  .delete(routeProtect, deleteGoal);

module.exports = router;
