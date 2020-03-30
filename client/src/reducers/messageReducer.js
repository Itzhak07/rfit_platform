import { GET_EMAILS, SEND_EMAIL } from "../actions/types";
const initialState = {
  emails: [],
  isNewMessage: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_EMAILS:
      return {
        ...state,
        emails: payload,
        isNewMessage: false
      };
    case SEND_EMAIL:
      return {
        ...state,
        isNewMessage: payload
      };

    default:
      return state;
  }
}
