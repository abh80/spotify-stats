// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

import * as Constants from "../../Constants";

export default async (req, res) => {
  if (req.method != "POST")
    return res.status(405).json({
      message: "Only POST request are allowed",
      trace: "ERR_NOT_POST",
    });
  req.body = JSON.parse(req.body);

  if (!req.body.code)
    return res
      .status(400)
      .json({ message: "Method not allowed", trace: "ERR_NO_ALLOW_METHOD" });
  let code = req.body.code;
  try {
    const { data } = await axios({
      url: "https://accounts.spotify.com/api/token",
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            Constants.clientID + ":" + Constants.clientSecret
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        code,
        redirect_uri: Constants.redirectURI,
        grant_type: "authorization_code",
      },
    });
    res.status(200).json(data);
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Unable to calculate trace", trace: null });
  }
};
