var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const sgMail = require("@sendgrid/mail");

const config = require("config");
const API_KEY = config.get("sendgrid_API_KEY");
const myMail = config.get("myMail");

router.post(
  "/",
  [check("email", "Please include a valid email!").isEmail()],
  async function(req, res, next) {
    const reqErrors = validationResult(req);
    if (!reqErrors.isEmpty()) {
      console.log(reqErrors);

      return res.status(400).json(reqErrors);
    }

    try {
      const { body } = req;
      const { name, company, email, message } = body;

      sgMail.setApiKey(API_KEY);
      const msg = {
        to: myMail,
        from: "support@rfit-platform.com",
        subject: "New Message from RFit Platform",
        text: message,
        html: `
        <h1>You have a new contact</h1>
           <ul>
           <li>Name: ${name}</li>
           <li>Email: ${email} </li>
           <li>Company: ${company}</li>
           </ul>
           <p>Message: ${message}</p>`
      };
      await sgMail.send(msg);
      res.json(body);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
