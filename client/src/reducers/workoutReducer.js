import {
  FETCH_WORKOUTS,
  NEW_WORKOUT,
  DELETE_WORKOUT,
  UPDATE_WORKOUT
} from "../actions/types";
import moment from "moment";

const initialState = {
  workouts: [],
  today: [],
  loading: true
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
        loading: false
      };

    case NEW_WORKOUT:
      return {
        ...state,
        workouts: payload,
        today: payload.filter(workout => {
          return (
            moment(workout.startDate).format("MMM Do YY") ===
            moment().format("MMM Do YY")
          );
        }),
        loading: false
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
        loading: false
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
        loading: false
      };
    default:
      return state;
  }
};
