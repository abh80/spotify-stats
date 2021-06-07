import React from "react";
import * as Util from "../Util";
import Head from "next/head";
import * as Constants from "../Constants";
import Loader from "../components/AppLoader";
import styles from "../styles/App.module.css";
import Menu from "../components/menu";
import { connect } from "react-redux";
import { setState } from "../redux/actions/state";
import { setTop } from "../redux/actions/apiReducer";
import CardSkeleton from "../components/skeletons/card";
import Card from "../components/card";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.state,
      ...this.props.apiReducer,
    };
  }

  componentDidMount() {
    if (!Util.CheckIFLogged(window))
      return (window.location.href = "/authorize");
    if (!this.state.token) {
      let localStorage = window.localStorage;
      const token = localStorage.getItem(Constants.codes.Token);
      const refresher = localStorage.getItem(Constants.codes.Refresher);

      const time = localStorage.getItem(Constants.codes.Time);
      const user = JSON.parse(localStorage.getItem(Constants.codes.User)).user;
      this.setState({ user, token, refresher, time });
      this.props?.set({ user, token, refresher, time });
    }
  }
  async onReady() {
    const tracks = await this.props.setTop(
      this.state.token,
      1,
      "tracks",
      "short_term"
    );
    const artists = await this.props.setTop(
      this.state.token,
      1,
      "artists",
      "short_term"
    );
    this.setState({ tracks: tracks, artists: artists });
  }
  render() {
    const { set } = this.props;
    return (
      <>
        <Head>
          <title>Home</title>
        </Head>
        {!this.state.ready ? (
          <Loader source={this} setReduxState={set} />
        ) : (
          this.mainPage()
        )}
      </>
    );
  }
  mainPage() {
    const state = this.state;
    if (state.avatarColors?.length == 1)
      state.avatarColors[1] = state.avatarColors[0];
    return (
      <div className="flex fullscreen">
        <Head>
          {" "}
          <meta property="og:title" content="Spotify Stats" />
          <meta property="og:site_name" content="Spotify Stats" />
          <meta property="og:url" content={Constants.hostURL + "home"} />
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

        <Menu />
        <div className="fullscreen">
          <div
            className={styles.hero}
            style={{
              background: `rgba(${
                state.avatarColors
                  ? state.avatarColors[1].join(",") + ",0.5"
                  : "83, 83, 83"
              })`,
            }}
          >
            <div
              className={styles.hero_banner + " flex gap-10"}
              style={{
                background: `linear-gradient(to bottom, transparent ,rgba(${
                  state.avatarColors
                    ? state.avatarColors[0].join(",") + ", 0.7"
                    : "0,0,0,.5"
                })`,
              }}
            >
              <div className={styles["round-user-avatar"]}>
                <img
                  height="100%"
                  width="100%"
                  src={
                    state.avatarColors
                      ? state.user.images[0].url
                      : "https://www.shazam.com/resources/291229600ef1fb473214ef503895c8185827152f/no-artist-image.jpg"
                  }
                />
              </div>
              <div
                className={styles.font_details}
                style={{
                  color: state.user.images
                    ? state.avatarColors
                      ? state.avatarColors[0]
                        ? state.avatarColors[0][0] > 150
                          ? "#000"
                          : "#fff"
                        : "#fff"
                      : "#fff"
                    : "#fff",
                }}
              >
                <p className={styles.profile_text}>Welcome</p>
                <p className={styles.name_text}>{state.user.display_name}</p>
                <p className={styles.followers_text}>
                  {state.user.followers.total} Followers
                </p>
              </div>
            </div>
          </div>
          <div
            style={{ marginTop: "30px", padding: "30px", display: "flex" }}
            className="gap-10"
          >
            {!this.state.tracks ? (
              <CardSkeleton />
            ) : (
              <Card
                image={this.state.tracks[0].album.images[0].url}
                title="Top Tracks"
                description="View your top tracks"
                href="/app/toptracks"
              />
            )}
            {!this.state.artists ? (
              <CardSkeleton />
            ) : (
              <Card
                image={this.state.artists[0].images[0].url}
                title="Top Artists"
                description="View your top artists"
                href="/app/topartists"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  set: setState,
  setTop,
};
export default connect((state) => state, mapDispatch)(Home);
