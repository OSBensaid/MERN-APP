const dotenv = require("dotenv");
const express = require("express");
const GoalRouters = require("./routes/goalRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/goals", GoalRouters);

// Middleware
app.use(errorHandler);

app.listen(PORT, console.log(`Server running on ${PORT}`));
