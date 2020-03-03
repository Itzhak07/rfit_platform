var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var workoutSchema = new Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true
  },
  notes: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  startDate: { type: Date, default: Date.now, required: true },
  endDate: { type: Date, default: Date.now, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Workout", workoutSchema);
