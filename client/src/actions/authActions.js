import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_USER
} from "./types";
import { setAlert } from "./alertActions";
import setAuthToken from "../utils/setAuthToken";
import { fetchClients } from "./clientActions";
import { fetchWorkouts } from "./workoutActions";
import { setPageName } from "./pageActions";
import { getMessages } from "./messageActions";

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("https://rfit-platform.herokuapp.com/api/auth");

    await dispatch({
      type: USER_LOADED,
      payload: res.data
    });

    await dispatch(fetchClients());
    await dispatch(fetchWorkouts());
    await dispatch(getMessages());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = ({
  firstName,
  lastName,
  email,
  password
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ firstName, lastName, email, password });

  try {
    const res = await axios.post(
      "https://rfit-platform.herokuapp.com/api/users",
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const { error } = err.response.data;

    dispatch(setAlert(error));

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "https://rfit-platform.herokuapp.com/api/auth",
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const { error } = err.response.data;

    dispatch(setAlert(error));

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  dispatch(setPageName("Dashboard"));
};

export const updateUser = data => dispatch => {
  axios
    .put(`https://rfit-platform.herokuapp.com/api/users/update`, data)
    .then(res => {
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
    })
    .catch(err => {});
};
