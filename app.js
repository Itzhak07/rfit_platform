var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");

var userRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var clientsRouter = require("./routes/clients");
var workoutsRouter = require("./routes/workouts");
const config = require("config");

const db_atlas = config.get("mongoURI");

// console.log(db_atlas);

var app = express();

// Connection to MongoDB
mongoose.connect(db_atlas, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// mongodb+srv://Itzhak07:Itzhak07@cluster0-tuoql.mongodb.net/RFit_DB?retryWrites=true&w=majority

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected!");
});

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/workouts", workoutsRouter);

// heroku check
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

  // app.get('*', function (req, res) {
  //   const index = path.join(__dirname,'client', 'build', 'index.html');
  //   res.sendFile(index);
  // });
}

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.json("error");
// });

module.exports = app;
