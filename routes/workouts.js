var express = require("express");
var router = express.Router();
const WorkoutsController = require("../controllers/workoutsController");
const { check, validationResult } = require("express-validator");
var moment = require("moment");
const auth = require("../middleware/auth");

/* GET ALL WORKOUTS */
router.get("/", auth, async function(req, res, next) {
  const { id } = req.user;

  try {
    const workouts = await WorkoutsController.getAll(id);

    res.json(workouts);
  } catch (err) {
    res.status(409).json(err);
  }
});

// POST new workout

router.post(
  "/",
  [
    check("client", "please select a client")
      .not()
      .isEmpty(),
    check("notes", "Workout is required!")
      .not()
      .isEmpty(),
    check("date", "Date is required!")
      .not()
      .isEmpty(),
    check("startDate", "Starting Time is required!")
      .not()
      .isEmpty(),
    check("endDate", "Ending Time is required!")
      .not()
      .isEmpty()
  ],
  auth,
  async function(req, res, next) {
    const reqErrors = validationResult(req);

    if (!reqErrors.isEmpty()) {
      return res.status(400).json({
        error: reqErrors.array()
      });
    }

    try {
      const { id } = req.user;
      const newWorkout = await WorkoutsController.addWorkout(req, id);
      res.json(newWorkout);
    } catch (err) {
      res.status(409).json(err);
    }
  }
);

// GET Single Workout

router.get("/singleworkout", async function(req, res, next) {
  try {
    const workout = await WorkoutsController.getSingleWorkout(req);
    res.json(workout);
  } catch (err) {
    res.status(409).json(err);
  }
});

// DELETE workout
router.delete("/delete/:id", auth, async function(req, res, next) {
  try {
    const { id } = req.user;
    const workouts = await WorkoutsController.deleteWorkout(req, id);

    res.json(workouts);
  } catch (err) {
    res.status(409).json(err);
  }
});

// Update Workout
router.put("/update", auth, async function(req, res, next) {
  try {
    const { id } = req.user;
    console.log(id);

    const workouts = await WorkoutsController.updateWorkout(req, id);
    console.log(workouts);

    res.json(workouts);
  } catch (err) {
    res.status(409).json(err);
  }
});

module.exports = router;
