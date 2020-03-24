var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

const config = require("config");
const user = config.get("mail.user");
const password = config.get("mail.password");

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

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: user, // generated ethereal user
          pass: password // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      // send mail with defined transport object
      let info = transporter.sendMail({
        from: `RFit Platform <${user}>`,
        to: user, // sender address
        subject: "New RFit Platform Message", // Subject line
        text: message, // plain text body
        html: `<h1>You Have a new contact</h1>
                <ul>
                    <li>Name: ${name}</li>
                    <li>Mail: ${email}</li>
                    <li>Company: ${company}</li>
                </ul>
                <p>Message: ${message}</p>`
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.json(body);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
