import { HYDRATE } from "next-redux-wrapper";
import * as types from "../env/types";

const reducer = (
  state = {
    tracks: null,
    artists: null,
  },
  action
) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case types.SET_TOP_TRACK:
      return { ...state, tracks: action.payload };
    case types.SET_TOP_ARTIST:
      return { ...state, artists: action.payload };
    default:
      return state;
  }
};
export default reducer;
