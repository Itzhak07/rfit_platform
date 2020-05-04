const express = require("express");
const path = require("path");
const app = express();
const fetch = require("node-fetch");
// var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");

var userRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var clientsRouter = require("./routes/clients");
var workoutsRouter = require("./routes/workouts");
var contactRouter = require("./routes/contact");
var messagesRouter = require("./routes/messages");
const config = require("config");

const db_atlas = config.get("mongoURI");
const site_url = config.get("site_url");

// Connect Database
mongoose.connect(db_atlas, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected!");
});

// Init Middleware
app.set("view engine", "");
app.use(express.json({ extended: false }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "500mb",
    parameterLimit: 10000000000,
  })
);

app.use(cors());

// Define Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/workouts", workoutsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/messages", messagesRouter);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;
const thirtyMinutes = 30 * 60 * 1000;

(function () {
  setInterval(() => {
    try {
      fetch(site_url, { method: "GET" });
    } catch (error) {
      console.error("Error:", error);
    }
  }, thirtyMinutes);
})();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
