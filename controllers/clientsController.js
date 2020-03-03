const Client = require("../models/Client");

class ClientController {
  static getAll(id) {
    return new Promise((resolve, reject) => {
      Client.find({ user: id }, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
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
        if (err) reject(err);
        resolve(ClientController.getAll(id));
      });
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

module.exports = ClientController;
