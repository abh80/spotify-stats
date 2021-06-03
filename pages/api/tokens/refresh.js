import axios from "axios";

import * as Constants from "../../../Constants";

export default async (req, res) => {
  if (req.method != "POST")
    return res
      .status(405)
      .json({ message: "Method not allowed", trace: "ERR_NO_ALLOW_METHOD" });
  const { refresh_token } = JSON.parse(req.body);
  if (!refresh_token)
    return res.status(400).json({
      message: "Missing refresh token",
      trace: "NO_REFRESHER_PROVIDED",
    });
  try {
    const { data } = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      params: {
        grant_type: "refresh_token",
        refresh_token,
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            Constants.clientID + ":" + Constants.clientSecret
          ).toString("base64"),
      },
    });
    res.json(data);
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Unable to calculate trace", trace: null });
  }
};
