const Message = require("../models/Message");
const config = require("config");
const sgMail = require("@sendgrid/mail");
const API_KEY = config.get("sendgrid_API_KEY");
const accountSid = config.get("accountSid");
const authToken = config.get("authToken");
const Twilio_Phone = config.get("Twilio_Phone");
const twilio = require("twilio")(accountSid, authToken, { lazyLoading: true });
const clientController = require("../controllers/clientsController");

class MessageController {
  static getAll(id) {
    return new Promise((resolve, reject) => {
      Message.find({ user: id })
        .populate("participants")
        .sort({ date: -1 })
        .exec((err, data) => {
          if (err) reject(err);
          resolve(data);
        });
    });
  }

  static sendEmailMessage(user, req) {
    const { subject, to, message, type } = req.body;
    const { _id, email } = user;
    const participantsEmail = to.map(participant => {
      return participant.email;
    });

    return new Promise(async (resolve, reject) => {
      try {
        const newMessage = new Message({
          subject: subject,
          participants: null,
          message: message,
          user: _id,
          type: 1
        });

        const msg = {
          to: participantsEmail,
          from: email,
          subject: subject,
          text: message,
          html: `
        <h4>${message}</h4>`
        };

        if (type === "Welcome_Mail") {
          const thisNewClient = await clientController.getClientByEmail(
            participantsEmail[0],
            _id
          );

          newMessage.participants = [thisNewClient[0]._id];
        } else {
          const participantsId = to.map(participant => {
            return participant.id || participant._id;
          });

          newMessage.participants = participantsId;
        }

        sgMail.setApiKey(API_KEY);

        await sgMail.send(msg);
        await newMessage.save((err, data) => {
          if (err) reject(err);

          resolve(MessageController.getAll(_id));
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  static sendWhatsAppMessage(user, client, req) {
    const { _id, firstName, lastName } = user;
    const { phone } = client;
    const { message, client_id, subject } = req.body;

    const newMessage = new Message({
      subject: subject,
      participants: client_id,
      message: message,
      user: _id,
      type: 2
    });

    return new Promise(async (resolve, reject) => {
      try {
        await twilio.messages
          .create({
            body: `${message} with ${firstName} ${lastName}`,
            from: `whatsapp:${Twilio_Phone}`,
            to: `whatsapp:${phone}`
          })
          .then(() =>
            newMessage.save((err, data) => {
              if (err) reject(err);

              resolve(MessageController.getAll(_id));
            })
          );
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = MessageController;
