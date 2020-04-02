import { GET_MESSAGES, SEND_EMAIL, SEND_WHATSAPP } from "./types";
import Axios from "axios";

export const getMessages = () => dispatch => {
  Axios.get(`https://rfit-platform.herokuapp.com/api/messages/`).then(res => {
    dispatch({
      type: GET_MESSAGES,
      payload: res.data
    });
  });
};

export const sendEmail = data => dispatch => {
  Axios.post(`https://rfit-platform.herokuapp.com/api/messages/email/send`, data).then(
    res => {
      dispatch({
        type: SEND_EMAIL,
        payload: true
      });
      dispatch({
        type: GET_MESSAGES,
        payload: res.data
      });
    }
  );
};

export const sendWhatsApp = data => dispatch => {
  Axios.post(`https://rfit-platform.herokuapp.com/api/messages/whatsapp/send`, data).then(
    res => {
      dispatch({
        type: SEND_WHATSAPP,
        payload: true
      });
      dispatch({
        type: GET_MESSAGES,
        payload: res.data
      });
    }
  );
};
