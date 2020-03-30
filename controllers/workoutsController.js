const Workout = require("../models/Workout");
var moment = require("moment");

class WorkoutsController {
  static getAll(id) {
    return new Promise((resolve, reject) => {
      Workout.find({ user: id })
        .populate("client")
        .sort({ startDate: -1 })
        .exec((err, data) => {
          if (err) reject(err);
          resolve(data);
        });
    });
  }

  static addWorkout({ body }, id) {
    const { client, notes, date, startDate, endDate } = body;
    const wodDate = moment(date).format("YYYY-MM-DD");
    const start = moment(startDate);
    const end = moment(endDate);

    return new Promise((resolve, reject) => {
      let newWorkout = new Workout({
        client,
        notes,
        date: wodDate,
        startDate: new Date(start),
        endDate: new Date(end),
        user: id
      });

      newWorkout.save((err, data) => {
        if (err) reject(err);
        resolve(WorkoutsController.getAll(id));
      });
    });
  }

  static getSingleWorkout({ body }) {
    const { workout_id } = body;

    return new Promise((resolve, reject) => {
      Workout.find({
        _id: `${workout_id}`
      })
        .populate("client")
        .exec((err, data) => {
          if (err) reject(err);
          resolve(data);
        });
    });
  }

  static deleteWorkout({ params }, userid) {
    const { id } = params;

    return new Promise((resolve, reject) => {
      Workout.findByIdAndDelete(id).exec((err, data) => {
        if (err) reject(err);
        resolve(WorkoutsController.getAll(userid));
      });
    });
  }

  static updateWorkout({ body }, userId) {
    const { id } = body;

    return new Promise((resolve, reject) => {
      Workout.findByIdAndUpdate(id, body, function(err, docs) {
        if (err) {
          reject(err);
        } else {
          resolve(WorkoutsController.getAll(userId));
        }
      });
    });
  }
}

module.exports = WorkoutsController;
