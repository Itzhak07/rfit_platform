import { FETCH_CLIENTS, NEW_CLIENT, UPDATE_CLIENT } from "../actions/types";

const initialState = {
  clients: null,
  active: null,
  loading: true,
  isNewClient: false
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
        loading: false,
        isNewClient: false
      };
    case NEW_CLIENT:
      return {
        ...state,
        clients: payload,
        active: payload.filter(client => {
          return client.status !== 2;
        }),
        loading: false,
        isNewClient: true
      };
    case UPDATE_CLIENT:
      return {
        ...state,
        clients: payload,
        active: payload.filter(client => {
          return client.status === 1;
        }),
        loading: false,
        isNewClient: false
      };

    default:
      return state;
  }
};
