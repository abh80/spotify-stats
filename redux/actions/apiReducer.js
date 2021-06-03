import * as types from "../env/types";
export const setTop =
  (token, limit, type = "tracks", range = "short_term") =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      fetch(
        "https://api.spotify.com/v1/me/top/" +
          type +
          "?limit=" +
          limit +
          "&time_range=" +
          range,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((x) => x.json())
        .then((json) => {
          if (!json.items) return reject();
          if (!json.items.length) return resolve(null);
          resolve(json.items);
          dispatch({
            type: type == "tracks" ? types.SET_TOP_TRACK : types.SET_TOP_ARTIST,
            payload: json.items,
          });
        });
    });
  };
