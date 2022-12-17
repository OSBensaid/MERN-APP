const dotenv = require("dotenv");
const colors = require("colors");
const express = require("express");
const GoalRouters = require("./routes/goalRoutes");
const UserRouters = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const ConnectDB = require("./config/db");

dotenv.config();
const PORT = process.env.PORT || 5000;
process.env.NODE_ENV === "production" ? colors.disable() : colors.enable();

// Connect to MongoDB
ConnectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/goals", GoalRouters);
app.use("/api/users", UserRouters);

// Middleware
app.use(errorHandler);

app.listen(PORT, console.log(`Server running on ${PORT}`));
