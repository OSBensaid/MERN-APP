const dotenv = require("dotenv");
const path = require("path");
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

// Serve frontend
if (process.env.Node_env === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to Production"));
}

// Middleware
app.use(errorHandler);

app.listen(PORT, console.log(`Server running on ${PORT}`));
