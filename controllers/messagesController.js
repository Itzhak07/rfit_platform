const Message = require("../models/Message");
const sgMail = require("@sendgrid/mail");
const config = require("config");
const API_KEY = config.get("sendgrid_API_KEY");

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

  static sendMessage(user, req) {
    const { subject, to, message } = req.body;
    const { _id, email } = user;
    const participantsEmail = to.map(participant => {
      return participant.email;
    });
    const paticipantsId = to.map(participant => {
      return participant.id || participant._id;
    });

    return new Promise(async (resolve, reject) => {
      let newMessage = new Message({
        subject: subject,
        participants: paticipantsId,
        message: message,
        user: _id
      });

      sgMail.setApiKey(API_KEY);

      const msg = {
        to: participantsEmail,
        from: email,
        subject: subject,
        text: message,
        html: `
          <h4>${message}</h4>`
      };

      try {
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

  static getSingleClient(req) {
    const { id } = req.body;
    return new Promise((resolve, reject) => {
      Client.find({ _id: `${id}` }).exec((err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  static updateClient({ body }, userid) {
    const { _id } = body;
    return new Promise((resolve, reject) => {
      Client.findByIdAndUpdate(_id, body).exec((err, docs) => {
        if (err) reject(err);
        resolve(ClientController.getAll(userid));
      });
    });
  }
}

module.exports = MessageController;
