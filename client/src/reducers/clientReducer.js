import { FETCH_CLIENTS, NEW_CLIENT, UPDATE_CLIENT } from "../actions/types";

const initialState = {
  clients: null,
  active: null,
  loading: true
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CLIENTS:
      return {
        ...state,
        clients: payload,
        active: payload.filter(client => {
          return client.status !== 2;
        }),
        loading: false
      };
    case NEW_CLIENT:
      return {
        ...state,
        clients: payload,
        active: payload.filter(client => {
          return client.status !== 2;
        }),
        loading: false
      };
    case UPDATE_CLIENT:
      return {
        ...state,
        clients: payload,
        active: payload.filter(client => {
          return client.status === 1;
        }),
        loading: false
      };

    default:
      return state;
  }
};