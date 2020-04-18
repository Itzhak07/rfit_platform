const Client = require("../models/Client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const gravatar = require("gravatar");

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

  static clientValidation(email) {
    const email_lowerCase = email.toLowerCase();
    let client = Client.findOne({ email: email_lowerCase });

    return client;
  }

  static addClient(req, id) {
    const { firstName, lastName, email, phone, gender } = req.body;

    return new Promise(async (resolve, reject) => {
      let newClient = new Client({
        firstName,
        lastName,
        email,
        phone: phone.split(" ").join(""),
        gender,
        user: id,
      });

      const { password } = newClient;

      const salt = await bcrypt.genSalt(10);
      newClient.password = await bcrypt.hash(password, salt);
      await newClient.save((err, data) => {
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
      Client.find({ _id: `${client_Id}` })
        // .select("-password")
        .exec((err, data) => {
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

  static updateInfo(body, id) {
    return new Promise((resolve, reject) => {
      Client.findByIdAndUpdate(id, body).exec((err, docs) => {
        if (err) reject(err);
        resolve(ClientController.getSingleClient(id));
      });
    });
  }

  static login(user, password) {
    return new Promise(async (resolve, reject) => {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        reject({ error: "Invalid Credentials" });
      }
      const payload = {
        user: {
          id: user._id,
        },
      };
      jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  }

  static updatePassword(user, oldPass, newPass) {
    return new Promise(async (resolve, reject) => {
      const { _id } = user;
      const isMatch = await bcrypt.compare(oldPass, user.password);

      if (!isMatch) {
        reject({ error: "Invalid Credentials" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(newPass, salt);
        Client.findByIdAndUpdate(_id, { password: newPassword }).exec(
          (err, docs) => {
            if (err) reject(err);
            resolve(ClientController.getSingleClient(_id));
          }
        );
      }
    });
  }
}

module.exports = ClientController;
