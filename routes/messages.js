var express = require("express");
var router = express.Router();
const sgMail = require("@sendgrid/mail");
const config = require("config");
const API_KEY = config.get("sendgrid_API_KEY");
const UserController = require("../controllers/usersController");
const MessageController = require("../controllers/messagesController");
const ClientController = require("../controllers/clientsController");
const auth = require("../middleware/auth");

router.get("/", auth, async function(req, res, next) {
  try {
    const { id } = req.user;

    const messages = await MessageController.getAll(id);

    res.json(messages);
  } catch (err) {
    res.status(409).json("error");
  }
});


router.post("/email/send", auth, async function(req, res, next) {
  try {
    const { id } = req.user;
    const user = await UserController.getUser(id);
    const messages = await MessageController.sendEmailMessage(user, req);
    res.json(messages);
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});

router.post("/whatsapp/send", auth, async function(req, res, next) {
  try {
    const { id } = req.user;
    const { client_id } = req.body;
    const user = await UserController.getUser(id);
    const client = await ClientController.getSingleClient(client_id);

    const messages = await MessageController.sendWhatsAppMessage(
      user,
      client,
      req
    );

    res.json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
