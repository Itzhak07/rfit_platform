var express = require("express");
var router = express.Router();
const ClientController = require("../controllers/clientsController");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

/* GET users listing. */
router.get("/", auth, async function (req, res, next) {
  try {
    const { id } = req.user;

    const clients = await ClientController.getAll(id);

    res.json(clients);
  } catch (err) {
    res.status(409).json(err);
  }
});

router.post(
  "/",
  [
    check("firstName", "please metion First Name").not().isEmpty(),
    check("lastName", "Please mention Last Name").not().isEmpty(),
    check("email", "Please mention Email").isEmail(),
    check("phone", "Please mention Phone number").not().isEmpty(),
    check("gender", "Please mention Gender").not().isEmpty(),
  ],
  auth,
  async function (req, res, next) {
    const reqErrors = validationResult(req);
    if (!reqErrors.isEmpty()) {
      return res.status(400).json({
        error: reqErrors.array(),
      });
    }

    try {
      const { id } = req.user;
      const newClient = await ClientController.addClient(req, id);

      res.json(newClient);
    } catch (err) {
      console.log(err);
      res.status(409).json(err);
    }
  }
);

router.get("/singleclient", async function (req, res, next) {
  try {
    const client = await ClientController.getSingleClient(req);

    res.json(client);
  } catch (err) {
    res.status(409).json("error");
  }
});

// Update Client
router.put(
  "/update",
  [
    check("firstName", "please metion First Name").not().isEmpty(),
    check("lastName", "Please mention Last Name").not().isEmpty(),
    check("email", "Please mention Email").isEmail(),
    check("phone", "Please mention Phone number").not().isEmpty(),
    check("gender", "Please mention Gender").not().isEmpty(),
  ],
  auth,
  async function (req, res, next) {
    const reqErrors = validationResult(req);
    if (!reqErrors.isEmpty()) {
      return res.status(400).json({
        error: reqErrors.array(),
      });
    }
    try {
      const { id } = req.user;
      const clients = await ClientController.updateClient(req, id);

      res.json(clients);
    } catch (err) {
      console.log(err);

      const { errmsg } = err;
      res.status(409).json({ error: ["Client is already exists"] });
    }
  }
);

// Update Client *ClientApp
router.put("/update-info", auth, async function (req, res, next) {
  try {
    const { id } = req.user;
    const { body } = req;
    const client = await ClientController.updateInfo(body, id);

    res.json(client);
  } catch (err) {
    console.log(err);

    const { errmsg } = err;
    res.status(409).json({ error: ["Client is already exists"] });
  }
});

module.exports = router;
