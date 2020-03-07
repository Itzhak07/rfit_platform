import { FETCH_CLIENTS, NEW_CLIENT, UPDATE_CLIENT } from "./types";
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
    await Axios.post(`https://rfit-platform.herokuapp.com/api/clients/`, data).then(res => {
      dispatch({
        type: NEW_CLIENT,
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
