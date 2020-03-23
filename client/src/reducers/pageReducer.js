import { SET_PAGE_NAME } from "../actions/types";

const localStoragePage = localStorage.getItem("lastPageView");

const initialState = {
  pageName: !localStorage.getItem("token") ? "Dashboard" : localStoragePage
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PAGE_NAME:
      return {
        ...state,
        pageName: payload
      };
    default:
      return state;
  }
};
