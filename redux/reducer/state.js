import { HYDRATE } from "next-redux-wrapper";
import * as types from "../env/types";
const reducer = (
  state = {
    token: null,
    user: null,
    refresher: null,
    time: null,
    ready: false,
    avatarColors: null,
    heroTrackColors: [],
    heroArtistColors: [],
  },
  action
) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case types.UPDATE_STATE:
      return { ...state, ...action.payload };
    case types.GET_STATE:
      return state;
    default:
      return state;
  }
};

export default reducer;
