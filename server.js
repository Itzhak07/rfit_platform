const express = require("express");
const path = require("path");
const app = express();
// var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var cors = require("cors");

var userRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var clientsRouter = require("./routes/clients");
var workoutsRouter = require("./routes/workouts");
const config = require("config");

const db_atlas = config.get("mongoURI");

// Connect Database
mongoose.connect(db_atlas, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected!");
});

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/workouts", workoutsRouter);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join("client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
