import {
  FETCH_WORKOUTS,
  NEW_WORKOUT,
  DELETE_WORKOUT,
  UPDATE_WORKOUT
} from "../actions/types";
import moment from "moment";

const initialState = {
  workouts: [],
  thisMonth: [],
  thisWeek: [],
  today: [],
  loading: true,
  isNewWorkout: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_WORKOUTS:
      return {
        ...state,
        workouts: payload,
        today: payload.filter(workout => {
          return (
            moment(workout.startDate).format("MMM Do YY") ===
            moment().format("MMM Do YY")
          );
        }),
        thisMonth: payload.filter(workout => {
          return (
            moment(workout.startDate).format("YYYY-MM-DD ") >=
              moment()
                .startOf("month")
                .format("YYYY-MM-DD ") &&
            moment(workout.startDate).format("YYYY-MM-DD ") <=
              moment()
                .endOf("month")
                .format("YYYY-MM-DD ")
          );
        }),
        thisWeek: payload.filter(workout => {
          return (
            moment(workout.startDate).format("YYYY-MM-DD ") >=
              moment()
                .startOf("week")
                .format("YYYY-MM-DD ") &&
            moment(workout.startDate).format("YYYY-MM-DD ") <=
              moment()
                .endOf("week")
                .format("YYYY-MM-DD ")
          );
        }),
        loading: false,
        isNewWorkout: false
      };

    case NEW_WORKOUT:
      return {
        ...state,
        isNewWorkout: payload
      };
    case DELETE_WORKOUT:
      return {
        ...state,
        workouts: payload,
        today: payload.filter(workout => {
          return (
            moment(workout.startDate).format("MMM Do YY") ===
            moment().format("MMM Do YY")
          );
        }),
        thisMonth: payload.filter(workout => {
          return (
            moment(workout.startDate).format("YYYY-MM-DD ") >=
              moment()
                .startOf("month")
                .format("YYYY-MM-DD ") &&
            moment(workout.startDate).format("YYYY-MM-DD ") <=
              moment()
                .endOf("month")
                .format("YYYY-MM-DD ")
          );
        }),
        thisWeek: payload.filter(workout => {
          return (
            moment(workout.startDate).format("YYYY-MM-DD ") >=
              moment()
                .startOf("week")
                .format("YYYY-MM-DD ") &&
            moment(workout.startDate).format("YYYY-MM-DD ") <=
              moment()
                .endOf("week")
                .format("YYYY-MM-DD ")
          );
        }),
        loading: false,
        isNewWorkout: false
      };
    case UPDATE_WORKOUT:
      return {
        ...state,
        workouts: payload,
        today: payload.filter(workout => {
          return (
            moment(workout.startDate).format("MMM Do YY") ===
            moment().format("MMM Do YY")
          );
        }),
        thisMonth: payload.filter(workout => {
          return (
            moment(workout.startDate).format("YYYY-MM-DD ") >=
              moment()
                .startOf("month")
                .format("YYYY-MM-DD ") &&
            moment(workout.startDate).format("YYYY-MM-DD ") <=
              moment()
                .endOf("month")
                .format("YYYY-MM-DD ")
          );
        }),
        thisWeek: payload.filter(workout => {
          return (
            moment(workout.startDate).format("YYYY-MM-DD ") >=
              moment()
                .startOf("week")
                .format("YYYY-MM-DD ") &&
            moment(workout.startDate).format("YYYY-MM-DD ") <=
              moment()
                .endOf("week")
                .format("YYYY-MM-DD ")
          );
        }),
        loading: false,
        isNewWorkout: false
      };
    default:
      return state;
  }
};
