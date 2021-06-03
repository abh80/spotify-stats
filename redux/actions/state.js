import * as types from "../env/types";

export const setState = (state) => (dispatch) => {
  return dispatch({
    type: types.UPDATE_STATE,
    payload: state,
  });
};
