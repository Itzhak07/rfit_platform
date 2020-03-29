import { GET_EMAILS, SEND_EMAIL } from "./types";
import Axios from "axios";

export const getEmails = () => dispatch => {
  Axios.get(`https://rfit-platform.herokuapp.com/api/messages/`).then(res => {
    dispatch({
      type: GET_EMAILS,
      payload: res.data
    });
  });
};

export const sendEmail = data => dispatch => {
  Axios.post(`https://rfit-platform.herokuapp.com/api/messages/send`, data).then(res => {
    dispatch({
      type: SEND_EMAIL,
      payload: res.data
    });
  });
};
