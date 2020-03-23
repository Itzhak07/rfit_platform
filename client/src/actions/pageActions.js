import { SET_PAGE_NAME } from "./types";

export const setPageName = pageName => dispatch => {
  localStorage.setItem("lastPageView", pageName);

  dispatch({
    type: SET_PAGE_NAME,
    payload: pageName
  });
};
