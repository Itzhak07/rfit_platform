const Client = require("../models/Client");

class ClientController {
  static getAll(id) {
    return new Promise((resolve, reject) => {
      Client.find({ user: id })
        .sort({ lastName: 1 })
        .exec((err, data) => {
          if (err) reject(err);
          resolve(data);
        });
    });
  }

  static clientValidation(body) {
    const { email } = body;
    const email_lowerCase = email.toLowerCase();
    let client = Client.findOne({ email: email_lowerCase });

    return client;
  }

  static addClient(req, id) {
    const { firstName, lastName, email, phone, gender } = req.body;

    return new Promise((resolve, reject) => {
      let newClient = new Client({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        gender: gender,
        status: 1,
        user: id
      });

      newClient.save((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(ClientController.getAll(id));
        }
      });
    });
  }

  static getSingleClient(client_Id) {
    return new Promise((resolve, reject) => {
      Client.find({ _id: `${client_Id}` }).exec((err, data) => {
        if (err) reject(err);
        resolve(data[0]);
      });
    });
  }

  static getClientByEmail(email, user) {
    return new Promise((resolve, reject) => {
      Client.find({ email: `${email}`, user: user }).exec((err, data) => {
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

module.exports = ClientController;
