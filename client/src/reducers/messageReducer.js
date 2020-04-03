import { GET_MESSAGES, SEND_EMAIL, SEND_WHATSAPP } from "../actions/types";
const initialState = {
  allMessages: [],
  emails: [],
  whatsapp: [],
  isNewMessage: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MESSAGES:
      return {
        ...state,
        allMessages: payload,
        emails: payload.filter((msg) => msg.type === 1),
        whatsapp: payload.filter((msg) => msg.type === 2),
        isNewMessage: false,
      };
    case SEND_EMAIL:
    case SEND_WHATSAPP:
      return {
        ...state,
        isNewMessage: payload,
      };

    default:
      return state;
  }
}
