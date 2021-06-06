export const Spotify_Auth_Url = (
  scopes = "user-read-recently-played user-top-read user-read-private"
) =>
  `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${encodeURIComponent(
    redirectURI
  )}&response_type=code&scope=${scopes}`;
export const clientID = "8a0c080885d34f1f8fa4821f6194d9d7";
export const BrandColor = "#1db954";
export const clientSecret = process.env.secret;
export var codes = {
  Token: "token",
  Refresher: "refresher",
  User: "curent_user",
  Time: "lastTime",
};
export const hostURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : "https://spotify-stats-new.netlify.app/";
export const redirectURI = hostURL + "callback"