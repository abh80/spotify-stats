import axios from "axios";

import * as Constants from "../../../Constants";
import { getPaletteFromURL } from "color-thief-node";

export default async (req, res) => {
  if (req.method != "POST")
    return res.status(405).json({
      message: "Only POST request are allowed",
      trace: "ERR_NOT_POST",
    });
  const { avatar } = JSON.parse(req.body);
  if (!avatar)
    return res
      .status(400)
      .json({ message: "No avatar provided", trace: "PARAM_INSUFFICIENT" });
  try {
    await axios.get(avatar);
  } catch (e) {
    console.log(e)
    return res
      .status(400)
      .json({ message: "Not a valid url", trace: "ERR_URL_INVALID" });
  }
  try {
    const pallete = await getPaletteFromURL(avatar);
    res.json({ colors: pallete });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ message: "Unable to calculate trace", trace: null });
  }
};
