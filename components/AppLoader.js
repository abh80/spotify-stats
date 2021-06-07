import * as Constants from "../Constants";
import React from "react";
import styles from "../styles/App.module.css";
import Head from "next/head";
import * as Util from "../Util";
import ColorThief from "colorthief";
export default function LoaderPage({ source, setReduxState , MetaData = {}}) {
  React.useEffect(() => {
    if (!Util.CheckIFLogged(window)) return;
    function showError() {
      window.localStorage.clear();
      document.getElementById("error-sec").classList.toggle("show");
    }
    const t = document.getElementById("status_text-d32");

    t.textContent = "Checking Token";

    let token = window.localStorage.getItem(Constants.codes.Token);
    let time = window.localStorage.getItem(Constants.codes.Time);
    let user = JSON.parse(
      window.localStorage.getItem(Constants.codes.User)
    ).user;
    if (!time || !token)
      return (t.textContent = "Failed to load, Please refresh the page");
    if (Date.now() - time >= 3600000) {
      t.textContent = "Refreshing Token";
      fetch("/api/tokens/refresh", {
        method: "post",
        body: JSON.stringify({
          refresh_token:
            source.state.refresher ??
            window.localStorage.getItem(Constants.codes.Refresher),
        }),
      })
        .then((x) => x.json())
        .catch((e) => showError())
        .then((json) => {
          t.textContent = "Updating User Cache";
          const { access_token } = json;
          window.localStorage.setItem(Constants.codes.Token, access_token);
          window.localStorage.setItem(Constants.codes.Time, Date.now());
          fetch("/api/getuser", {
            headers: {
              Authorization: access_token,
            },
          })
            .catch((e) => showError())
            .then((res) => res.json())
            .catch((e) => showError())
            .then((res) => {
              const previousCache = JSON.parse(
                window.localStorage.getItem(Constants.codes.User)
              );
              previousCache.user = res;
              window.localStorage.setItem(
                Constants.codes.User,
                JSON.stringify(previousCache)
              );
              t.textContent = "Getting User Color";
              if (res.images?.length) {
                const img = new Image();
                const colorThief = new ColorThief();
                img.crossOrigin = "Anonymous";
                img.src = res.images[0].url;
                img.addEventListener("load", function () {
                  const color = colorThief.getPalette(img, 5);
                  t.textContent = "Almost There";
                  setTimeout(() => {
                    setReduxState({
                      ready: true,
                      token: access_token,
                      user: previousCache.user,
                      avatarColors: color,
                    });
                    source.setState({
                      ready: true,
                      token: access_token,
                      user: previousCache.user,
                      avatarColors: color,
                    });
                    source.onReady();
                  }, 1000);
                });
              } else {
                setTimeout(() => {
                  setReduxState({
                    ready: true,
                    token: access_token,
                    user: previousCache.user,
                    avatarColors: null,
                  });
                  source.setState({
                    ready: true,
                    token: access_token,
                    user: previousCache.user,
                    avatarColors: null,
                  });
                  source.onReady();
                }, 1000);
              }
            });
        });
    } else {
      t.textContent = "Getting User Color";
      if (user.images?.length) {
        let img = new Image();
        let colorThief = new ColorThief();
        img.src = user.images[0].url;
        img.crossOrigin = "Anonymous";
        img.addEventListener("load", function () {
          const color = colorThief.getPalette(img, 5);
          t.textContent = "Almost There";
          setTimeout(() => {
            source.setState({ ready: true, avatarColors: color });
            setReduxState({ ready: true, avatarColors: color });
            source.onReady();
          }, 1000);
        });
      } else {
        setTimeout(() => {
          source.setState({ ready: true, avatarColors: null });
          setReduxState({ ready: true, avatarColors: null });
          source.onReady();
        }, 1000);
      }
    }
  }, []);
  return (
    <div className="fullscreen">
      <Head>
        {" "}
        <title>Spotify Stats - Please Wait</title>
        <meta property="og:title" content={"Spotify Stats - " + MetaData.title} />
        <meta property="og:site_name" content="Spotify Stats" />
        <meta property="og:url" content={Constants.hostURL + MetaData.url} />
        <meta property="og:theme" content={Constants.BrandColor} />
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
      </Head>
      <div className={styles["loading-box"]}>
        <div style={{ height: "50px", width: "100px", margin: "auto" }}>
          <img
            className={styles.pulse + " " + styles.circle}
            src="/spotify/brand/assets/Spotify_Icon_RGB_Green.png"
            width="100%"
            height="100%"
          ></img>
        </div>
        <div className={styles.textContent}>
          <h1>Getting a few things ready</h1>
          <h2 id="status_text-d32">Loading Javascript Bundles</h2>
        </div>
      </div>
      <div id="error-sec" className="top-level-error">
        <div className="popup">
          <h1>Error!</h1>
          <div className="flatline"></div>
          <h2>
            Uh oh! We don't quite know what went wrong while starting the
            application. We request you not to make changes to app storages. The
            storage has been cleared please{" "}
            <a href="/">log in again to continue</a>.
          </h2>
        </div>
      </div>
    </div>
  );
}
