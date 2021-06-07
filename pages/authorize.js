import React, { Component } from "react";
import Head from "next/head";
import styles from "../styles/Authorize.module.css";
import * as Constants from "../Constants";
import * as Util from "../Util";
export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (Util.CheckIFLogged(window)) return (window.location.href = "/home");
  }
  render() {
    return (
      <>
        <Head>
          <meta property="og:title" content="Spotify Stats" />
          <meta property="og:site_name" content="Spotify Stats" />
          <meta property="og:url" content={hostURL + "authorize"} />
          <meta property="og:theme" content={BrandColor} />
          <meta
            property="og:description"
            content="All your Spotify Statistics at one place!"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://spotify-stats-omega.vercel.app/spotify/brand/assets/Spotify_Icon_RGB_Green.png"
          />
          <meta
            property="og:image:alt"
            content="Spotify Stats - All your Spotify Statistics at one place!"
          />
          <title>Spotify Stats - Authorize</title>
        </Head>
        <div className={"fullscreen"}>
          <div className={"fullscreen"}>
            <div
              className={"align-middle shadow-2xl " + styles["login_container"]}
            >
              <h1>Authorize</h1>
              <p>
                Please login using{" "}
                <a target="_blank" href="https://spotify.com">
                  Spotify
                </a>{" "}
                to continue to our service.
              </p>
              <button
                className={styles.auth_button}
                onClick={() =>
                  (window.location.href = Constants.Spotify_Auth_Url())
                }
              >
                Authorize Spotify{" "}
                <svg
                  className="external_icon"
                  style={{
                    position: "relative",
                    top: "0.15em",
                    marginLeft: "2px",
                  }}
                  aria-hidden="false"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M10 5V3H5.375C4.06519 3 3 4.06519 3 5.375V18.625C3 19.936 4.06519 21 5.375 21H18.625C19.936 21 21 19.936 21 18.625V14H19V19H5V5H10Z"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M21 2.99902H14V4.99902H17.586L9.29297 13.292L10.707 14.706L19 6.41302V9.99902H21V2.99902Z"
                  ></path>
                </svg>
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className={styles.cancel_button}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
