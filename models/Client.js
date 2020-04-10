var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true, default: "RFit7707" },
  phone: { type: String },
  status: { type: Number },
  gender: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Client", clientSchema);
