var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const UserController = require("../controllers/usersController");

/* GET User */
router.get("/", auth, async (req, res, next) => {
  try {
    const user = await UserController.getUser(req.user.id);

    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    check("email", "Please include a valid email!").isEmail(),
    check("password", "Password is required").exists()
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
      const { password } = req.body;
      let user = await UserController.userValidation(body);

      if (!user) {
        res.status(400).json({ error: [{ msg: "Invalid Credentials" }] });
      }

      let token = await UserController.login(user, password);

      res.json({ token: token });
    } catch (err) {
       res.status(500).json(err);
    }
  }
);

module.exports = router;
