var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  subject: { type: String, required: true },
  participants: [
    { type: Schema.Types.ObjectId, ref: "Client", required: true }
  ],
  message: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", MessageSchema);
