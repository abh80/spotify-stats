import * as Constants from "../Constants";
import React from "react";
import styles from "../styles/App.module.css";
import { setState } from "../redux/actions/state";
import * as Util from "../Util";
export default function loaderPage({ source, setReduxState }) {
  React.useEffect(() => {
    if (!Util.CheckIFLogged()) return;
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
              if (res.images) {
                fetch("/api/user/colors", {
                  method: "post",
                  body: JSON.stringify({ avatar: res.images[0].url }),
                })
                  .then((res) => res.json())
                  .then(({ colors }) => {
                    t.textContent = "Almost There";
                    setTimeout(() => {
                      source.setState({
                        ready: true,
                        avatarColors: colors,
                        user: previousCache.user,
                        token: access_token,
                      });
                      setReduxState({
                        ready: true,
                        avatarColors: colors,
                        user: previousCache.user,
                        token: access_token,
                      });
                      source.onReady();
                    }, 2000);
                  })
                  .catch(() => {
                    showError();
                  }, 1000);
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
      if (user.images) {
        fetch("/api/user/colors", {
          method: "post",
          body: JSON.stringify({ avatar: user.images[0].url }),
        })
          .then((res) => res.json())
          .then(({ colors }) => {
            t.textContent = "Almost There";
            setTimeout(() => {
              source.setState({ ready: true, avatarColors: colors });
              setReduxState({ ready: true, avatarColors: colors });
              source.onReady();
            }, 2000);
          })
          .catch(() => {
            source.setState({ ready: true, avatarColors: null });
            setReduxState({ ready: true, avatarColors: null });
            source.onReady();
          }, 1000);
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
