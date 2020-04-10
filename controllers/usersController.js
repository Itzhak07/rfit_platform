const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const config = require("config");

class UserController {
  static userValidation(body) {
    const { email } = body;
    const email_lowerCase = email.toLowerCase();
    let user = User.findOne({ email: email_lowerCase });

    return user;
  }

  static getUser(id) {
    return new Promise(async (resolve, reject) => {
      User.findById(id)
        .select("-password")
        .exec((err, data) => {
          if (err) reject(err);
          resolve(data);
        });
    });
  }

  static async register(body) {
    const { firstName, lastName, email, password } = body;

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    return new Promise(async (resolve, reject) => {
      let user = new User({
        firstName,
        lastName,
        email,
        password,
        avatar,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user._id,
          email: user.email,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 7200 },
        (error, token) => {
          if (error) reject(error);
          resolve(token);
        }
      );
    });
  }

  static login(user, password) {
    return new Promise(async (resolve, reject) => {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        reject({ error: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 7200 },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    });
  }

  static update({ body }, id) {
    return new Promise((resolve, reject) => {
      User.findByIdAndUpdate(id, body).exec((err, docs) => {
        if (err) reject(err);
        resolve(UserController.getUser(id));
      });
    });
  }
}

module.exports = UserController;
