import {
  FETCH_CLIENTS,
  NEW_CLIENT,
  UPDATE_CLIENT,
  SET_TOP_CLIENTS,
} from "./types";
import { setAlert } from "./alertActions";
import Axios from "axios";
import { fetchWorkouts } from "./workoutActions";

export const fetchClients = () => (dispatch) => {
  Axios.get(`https://rfit-platform.herokuapp.com/api/clients/`).then((res) => {
    dispatch({
      type: FETCH_CLIENTS,
      payload: res.data,
    });
  });
};

export const createClient = (data) => async (dispatch) => {
  try {
    await Axios.post(
      `https://rfit-platform.herokuapp.com/api/clients/`,
      data
    ).then((res) => {
      dispatch({
        type: NEW_CLIENT,
        payload: true,
      });

      dispatch({
        type: FETCH_CLIENTS,
        payload: res.data,
      });
    });
  } catch (err) {
    const { error } = err.response.data;

    dispatch(setAlert(error));
  }
};

export const updateClient = (data) => (dispatch) => {
  Axios.put(`https://rfit-platform.herokuapp.com/api/clients/update`, data)
    .then((res) => {
      dispatch({
        type: UPDATE_CLIENT,
        payload: true,
      });

      dispatch({
        type: FETCH_CLIENTS,
        payload: res.data,
      });

      dispatch(fetchWorkouts());
    })
    .catch((err) => {
      const { error } = err.response.data;

      dispatch(setAlert(error));
    });
};

export const setTopClients = (workouts) => (dispatch) => {
  let counter = {};
  const minCount = 4;
  const keyArray = workouts.map(function (item) {
    return { name: item["title"], id: item["client"] };
  });

  keyArray.forEach(function (obj) {
    let key = JSON.stringify(obj);

    counter[key] = (counter[key] || 0) + 1;
  });

  const mostFrequent = Object.keys(counter).filter(
    (k) => counter[k] >= minCount
  );
  let payload = mostFrequent.map((client) => {
    return JSON.parse(client);
  });

  if (payload.length === 0) {
    payload = null;
    dispatch({
      type: SET_TOP_CLIENTS,
      payload: payload,
    });
  } else {
    dispatch({
      type: SET_TOP_CLIENTS,
      payload: payload,
    });
  }
};
