var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var clientSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true, default: "RFit7707" },
  phone: { type: String },
  status: { type: Number, default: 1 },
  gender: { type: String },
  avatar: {
    type: String,
    default:
      "http://www.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=200&r=pg&d=mm",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Client", clientSchema);
