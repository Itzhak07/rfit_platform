import {
  FETCH_CLIENTS,
  NEW_CLIENT,
  UPDATE_CLIENT,
  SET_TOP_CLIENTS
} from "./types";
import { setAlert } from "./alertActions";
import Axios from "axios";
import { fetchWorkouts } from "./workoutActions";

export const fetchClients = () => dispatch => {
  Axios.get(`https://rfit-platform.herokuapp.com/api/clients/`).then(res => {
    dispatch({
      type: FETCH_CLIENTS,
      payload: res.data
    });
  });
};

export const createClient = data => async dispatch => {
  try {
    await Axios.post(
      `https://rfit-platform.herokuapp.com/api/clients/`,
      data
    ).then(res => {
      dispatch({
        type: NEW_CLIENT,
        payload: true
      });

      dispatch({
        type: FETCH_CLIENTS,
        payload: res.data
      });
    });
  } catch (err) {
    const { error } = err.response.data;

    dispatch(setAlert(error));
  }
};

export const updateClient = data => dispatch => {
  Axios.put(`https://rfit-platform.herokuapp.com/api/clients/update`, data)
    .then(res => {
      dispatch({
        type: UPDATE_CLIENT,
        payload: res.data
      });

      dispatch(fetchWorkouts());
    })
    .catch(err => {
      console.log(err);
    });
};

export const setTopClients = workouts => dispatch => {
  let counts = workouts.reduce((a, c) => {
    a[c.title] = (a[c.title] || 0) + 1;
    return a;
  }, {});
  let minCount = 3;
  let mostFrequent = Object.keys(counts).filter(k => counts[k] >= minCount);

  if (mostFrequent.length === 0) {
    mostFrequent = null;
    dispatch({
      type: SET_TOP_CLIENTS,
      payload: mostFrequent
    });
  } else {
    dispatch({
      type: SET_TOP_CLIENTS,
      payload: mostFrequent
    });
  }
};
