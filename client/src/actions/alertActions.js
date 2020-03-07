import { v4 as uuid } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = errors => dispatch => {
  const errorsArr = errors.map(err => {
    return err.msg;
  });

  const id = uuid();

  dispatch({
    type: SET_ALERT,
    payload: { id, msg: errorsArr }
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      }),
    3000
  );
};
