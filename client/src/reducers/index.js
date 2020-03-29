import { combineReducers } from "redux";
import workoutReducer from "./workoutReducer";
import alertReducer from "./alertReducer";
import clientReducer from "./clientReducer";
import authReducer from "./authReducer";
import pageReducer from "./pageReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
  auth: authReducer,
  workouts: workoutReducer,
  clients: clientReducer,
  messages: messageReducer,
  alerts: alertReducer,
  page: pageReducer
});
