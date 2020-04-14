var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const UserController = require("../controllers/usersController");
const ClientController = require("../controllers/clientsController");

/* GET User */
router.get("/", auth, async (req, res, next) => {
  try {
    const user = await UserController.getUser(req.user.id);

    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Coach Login

router.post(
  "/",
  [
    check("email", "Please include a valid email!").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async function (req, res, next) {
    const reqErrors = validationResult(req);
    if (!reqErrors.isEmpty()) {
      return res.status(400).json({
        error: reqErrors.array(),
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

// Client Login
router.post("/client/login", async function (req, res, next) {
  try {
    const { body } = req;
    const { password, email } = req.body;

    let user = await ClientController.clientValidation(email);
    if (!user) {
      console.log("no user");

      res.status(400).json({ error: "Invalid Credentials" });
    }

    if (user.status === 2) {
      console.log("user is not active");

      res
        .status(400)
        .json({ error: "User is not active, Please contact your trainer." });
    }

    let token = await ClientController.login(user, password);

    res.json({ token: token });
  } catch (err) {
    console.log("login error");
    console.log(err);

    res.status(500).json(err);
  }
});

/* GET Client */
router.get("/client", auth, async (req, res, next) => {
  try {
    const user = await ClientController.getSingleClient(req.user.id);

    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// PUT CLIENT UPDATE PASSWORD

// Update Workout
router.put("/client/update-password", auth, async function (req, res, next) {
  try {
    const user = await ClientController.getSingleClient(req.user.id);
    const { oldPass, newPass } = req.body;

    const client = await ClientController.updatePassword(
      user,
      oldPass,
      newPass
    );
    console.log("pass updated");

    res.json(client);
  } catch (err) {
    console.log("did not updated");

    // const { errmsg } = err;
    res.status(409).json(err);
  }
});

module.exports = router;
