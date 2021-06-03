import axios from "axios";
export default async (req, res) => {
  if (req.method != "GET")
    return res
      .status(405)
      .json({ message: "Method not allowed", trace: "ERR_NO_ALLOW_METHOD" });
  if (!req.headers.authorization)
    res.status(401).json({
      message: "No access token was provided in the header",
      trace: "ERR_NO_TOKEN",
    });
  const TOKEN = req.headers.authorization;
  try {
    const { data } = await axios({
      method: "get",
      url: "https://api.spotify.com/v1/me",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    res.json(data);
  } catch (e) {
    console.log(e.data.error);
    return res
      .status(400)
      .json({ message: "Unable to calculate trace", trace: null });
  }
};
