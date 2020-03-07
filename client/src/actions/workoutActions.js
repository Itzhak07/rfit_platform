import {
  FETCH_WORKOUTS,
  NEW_WORKOUT,
  DELETE_WORKOUT,
  UPDATE_WORKOUT
} from "./types";
import Axios from "axios";
import { setAlert } from "./alertActions";

const setWorkoutsData = data => {
  return data.map(data => {
    return {
      title: data.client.firstName + " " + data.client.lastName,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      date: data.date,
      id: data._id,
      client: data.client._id,
      notes: data.notes
    };
  });
};

export const fetchWorkouts = () => dispatch => {
  Axios.get(`https://rfit-platform.herokuapp.com/api/workouts/`).then(res => {
    const workouts = setWorkoutsData(res.data);

    dispatch({
      type: FETCH_WORKOUTS,
      payload: workouts
    });
  });
};

export const createWorkout = data => async dispatch => {
  const { title, startDate, endDate, notes, client } = data;

  try {
    let newWorkout = await Axios.post(`https://rfit-platform.herokuapp.com/api/workouts/`, {
      client: title ? title : client,
      notes: notes,
      date: startDate,
      startDate: startDate,
      endDate: endDate
    }).then(res => {
      return setWorkoutsData(res.data);
    });

    dispatch({
      type: NEW_WORKOUT,
      payload: newWorkout
    });
  } catch (err) {
    const { error } = err.response.data;

    dispatch(setAlert(error));
  }
};

export const deleteWorkout = id => dispatch => {
  Axios.delete(`https://rfit-platform.herokuapp.com/api/workouts/delete/${id}`)
    .then(res => {
      const workouts = setWorkoutsData(res.data);
      dispatch({
        type: DELETE_WORKOUT,
        payload: workouts
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateWorkout = data => dispatch => {
  Axios.put(`https://rfit-platform.herokuapp.com/api/workouts/update`, data)
    .then(res => {
      const workouts = setWorkoutsData(res.data);
      console.log(workouts);

      dispatch({
        type: UPDATE_WORKOUT,
        payload: workouts
      });
    })
    .catch(err => {
      console.log(err);
    });
};
