import {
  FETCH_CLIENTS,
  NEW_CLIENT,
  UPDATE_CLIENT,
  SET_TOP_CLIENTS
} from "../actions/types";

const initialState = {
  clients: null,
  active: null,
  topClients: null,
  loading: true,
  isNewClient: false,
  isClientUpdate: false
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
        isNewClient: false,
        isClientUpdate: false
      };
    case NEW_CLIENT:
      return {
        ...state,
        isNewClient: payload
      };
    case UPDATE_CLIENT:
      return {
        ...state,
        isClientUpdate: payload
      };
    case SET_TOP_CLIENTS:
      return {
        ...state,
        topClients: payload
      };

    default:
      return state;
  }
};
