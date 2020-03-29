import { GET_EMAILS, SEND_EMAIL } from "../actions/types";
const initialState = {
  emails: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_EMAILS:
      return {
        ...state,
        emails: payload
      };
    case SEND_EMAIL:
      return {
        ...state,
        emails: payload
      };

    default:
      return state;
  }
}
