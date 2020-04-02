import { GET_MESSAGES, SEND_EMAIL, SEND_WHATSAPP } from "../actions/types";
const initialState = {
  emails: [],
  whatsapp: [],
  isNewMessage: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MESSAGES:
      return {
        ...state,
        emails: payload.filter(email => email.type === 1),
        whatsapp: payload.filter(email => email.type === 2),
        isNewMessage: false
      };
    case SEND_EMAIL:
    case SEND_WHATSAPP:
      return {
        ...state,
        isNewMessage: payload
      };

    default:
      return state;
  }
}
