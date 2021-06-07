import React from "react";
import Head from "next/head";
import alternateStyles from "../styles/Authorize.module.css";
import Loader from "../components/loader";
import { codes } from "../Constants";
import * as Util from "../Util";
import { useRouter } from "next/router";
export default function Callback() {
  const [details, setDetails] = React.useState(0);

  React.useEffect(function mount() {
    if (Util.CheckIFLogged(window)) return (window.location.href = "/home");
    fetch("/api/authorize", {
      method: "POST",
      body: JSON.stringify({
        code: window.location.href
          .split("?")[1]
          .split("code=")[1]
          .split("&")[0],
      }),
    })
      .then((x) => {
        return x.json();
      })
      .then((json) => {
        const access_token = json.access_token;
        fetch("/api/getuser", {
          method: "get",
          headers: {
            Authorization: access_token,
          },
        })
          .then((x) => x.json())
          .then((x) => {
            const scheme = {
              token: access_token,
              refresher: json.refresh_token,
              time: Date.now(),
              user: x,
            };
            setDetails(scheme);
          });
      });
  }, []);
  return (
    <div className="fullscreen">
      <Head>
        <title>Welcome</title>
      </Head>
      <div className={alternateStyles["login_container"]}>
        {!details ? (
          <Loader styleApply={{ position: "relative", top: "40%" }} />
        ) : (
          <div style={{ padding: "20px", height: "100%", width: "100%" }}>
            <img
              style={{
                borderRadius: "50%",
                height: "100px",
                margin: "auto",
                width: "100px",
                objectFit: "cover",
              }}
              src={
                details.user.images?.length
                  ? details.user.images[0].url
                  : "https://www.shazam.com/resources/291229600ef1fb473214ef503895c8185827152f/no-artist-image.jpg"
              }
              className={alternateStyles["right-to-left"]}
            />
            <div style={{ marginTop: "10px" }}>
              <p style={{ fontSize: "1.3em", fontWeight: 700 }}>
                Welcome, {details.user.display_name}
              </p>
            </div>
            <div style={{ height: "75%" }}>
              <button
                onClick={() => {
                  window.localStorage.setItem(
                    "curent_user",
                    JSON.stringify(details)
                  );
                  window.localStorage.setItem(codes.Token, details.token);
                  window.localStorage.setItem(
                    codes.Refresher,
                    details.refresher
                  );
                  window.localStorage.setItem(codes.Time, details.time);
                  window.user = details;
                  window.location.href = "/home";
                }}
                className={alternateStyles.auth_button}
                style={{ display: "block" }}
              >
                Continue
              </button>
              <button
                className={alternateStyles.cancel_button}
                onClick={() => (window.location.href = "/")}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
