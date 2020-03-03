var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const UserController = require("../controllers/usersController");
const auth = require("../middleware/auth");

/*POST  Register user */

router.post(
  "/",
  [
    check("firstName", "First Name is required!")
      .not()
      .isEmpty(),
    check("lastName", "Last Name is required!")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email!").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async function(req, res, next) {
    const reqErrors = validationResult(req);
    if (!reqErrors.isEmpty()) {
      return res.status(400).json({
        error: reqErrors.array()
      });
    }

    try {
      const { body } = req;
      let user = await UserController.userValidation(body);

      if (user) {
        res.status(400).json({ error: [{ msg: "User already exists" }] });
      }

      let token = await UserController.register(body);

      res.json({ token: token });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

router.put("/update", auth, async function(req, res, next) {
  try {
    const { id } = req.user;
    const user = await UserController.update(req, id);
    res.json(user);
  } catch (err) {
    res.status(409).json(err);
  }
});

module.exports = router;
