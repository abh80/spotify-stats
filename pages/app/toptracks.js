import React from "react";
import { connect } from "react-redux";
import { setTop } from "../../redux/actions/apiReducer";
import { setState } from "../../redux/actions/state";
import Head from "next/head";
import * as Constants from "../../Constants";
import Menu from "../../components/menu";
import * as Util from "../../Util";
import Loader from "../../components/AppLoader";
import Header from "../../components/PWAHeader";
import ColorTheif from "colorthief";
import styles from "../../styles/Top.module.css";
import TrackItem from "../../components/trackItem";
class TopTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.state,
      ...this.props.apiReducer,
      totalItems: 0,
    };
  }
  async onReady() {
    const { setTop, set } = this.props;
    if (!this.state.tracks?.length || this.state.tracks?.length == 1) {
      const tracks = await setTop(this.state.token, 50, "tracks", "long_term");
      this.setState({ tracks });

      this.setState({ tracks });
      const colorThief = new ColorTheif();
      let img = new Image();
      img.src = tracks[0].album.images[0].url;
      img.crossOrigin = "Anonymous";
      const source = this;
      img.addEventListener("load", function () {
        const pallete = colorThief.getPalette(img, 5);
        source.setState({ heroTrackColors: pallete });
        set({ heroTrackColors: pallete });
      });
    }
  }
  componentDidMount() {
    window.onscroll = () => {
      if (window.scrollY >= 30) {
        document.getElementById("hero").style.height = "30%";
        document.getElementById(styles["font_details_1"]).style.fontSize =
          "20px";
        document.getElementById("font_details_2").style.fontSize = "15px";
      } else {
        document.getElementById("hero").style.height = "50%";
        document.getElementById(styles["font_details_1"]).style.fontSize =
          "40px";
        document.getElementById("font_details_2").style.fontSize = "25px";
      }
    };
    if (this.state.ready) this.onReady();
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
  render() {
    const { set } = this.props;
    return (
      <>
        {!this.state.ready ? (
          <Loader
            source={this}
            setReduxState={set}
            MetaData={{ url: "app/toptracks", title: "Top Tracks" }}
          />
        ) : (
          this.mainPage()
        )}
      </>
    );
  }
  mainPage() {
    return (
      <>
        <Header />
        <Head>
          {" "}
          <title>Spotify Stats - Top Tracks</title>
          <meta property="og:title" content="Spotify Stats - Top Tracks" />
          <meta property="og:site_name" content="Spotify Stats - Top Tracks" />
          <meta
            property="og:url"
            content={Constants.hostURL + "app/toptracks"}
          />
          <meta property="og:theme" content={Constants.BrandColor} />
          <meta
            property="og:description"
            content="All your Spotify Statistics at one place!"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content={
              Constants.hostURL +
              "spotify/brand/assets/Spotify_Icon_RGB_Green.png"
            }
          />
          <meta
            property="og:image:alt"
            content="Spotify Stats - All your Spotify Statistics at one place!"
          />
          <meta name="twitter:card" content="summary" />
          <meta
            name="twitter:description"
            content="All your Spotify Statistics at one place!"
          />
          <meta name="twitter:title" content="Spotify Stats - Top Tracks" />
          <meta name="twitter:creator" content="@trackerstars" />
          <meta name="twitter:theme-color" content={Constants.BrandColor} />
          <meta
            name="twitter:url"
            content={Constants.hostURL + "app/toptracks"}
          />
          <meta
            name="twitter:image"
            content={
              Constants.hostURL +
              "spotify/brand/assets/Spotify_Icon_RGB_Green.png"
            }
          />
        </Head>
        <div className="fullscreen flex">
          <Menu />
          {this.state.tracks && this.state.heroTrackColors.length ? (
            <div
              className="block fullscreen"
              style={{ overflowY: "auto" }}
              onScroll={(e) => {
                window.scrollY = e.target.scrollTop;
                window.onscroll();
              }}
            >
              <div
                id="hero"
                className={styles.pageHero}
                style={{
                  background: `rgba(${this.state.heroTrackColors[1].join(
                    ","
                  )})`,
                  top: 0,
                }}
              >
                <div
                  className={styles.topHero + " flex gap-10"}
                  style={{
                    background: `linear-gradient(to bottom, transparent ,rgba(${
                      this.state.heroTrackColors[0].join(",") + ", 0.7"
                    })`,
                  }}
                >
                  <img
                    id="font_image_1"
                    className={styles["animated-cover-image"]}
                    src={this.state.tracks[0].album.images[0].url}
                  />
                  <div
                    className={styles.fontDetails}
                    id={styles["font_details_1"]}
                    style={{
                      color:
                        this.state.heroTrackColors[0][0] < 150
                          ? "#fff"
                          : "#000",
                    }}
                  >
                    <h1>{this.state.tracks[0].name}</h1>
                    <h1
                      style={{ fontSize: "25px", fontWeight: 600 }}
                      id="font_details_2"
                    >
                      By{" "}
                      {this.state.tracks[0].artists
                        .map((x) => x.name)
                        .join(", ")}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="grid grid-rows py-32 px-16 gap-10">
                <div
                  className="grid grid-cols-6 gap-10"
                  style={{
                    color: "#b3b3b3",
                    textTransform: "uppercase",
                    fontSize: "12px",
                  }}
                >
                  <div>#</div>
                  <div></div>
                  <div>Name/Artist</div>
                  <div>Album</div>
                </div>
                <hr></hr>
                {this.state.tracks.map((x, l) => (
                  <TrackItem
                    index={l + 1}
                    key={l}
                    name={x.name}
                    artist={x.artists[0].name}
                    cover={x.album.images[0].url}
                    albumname={x.album.name}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default connect((state) => state, { setTop, set: setState })(TopTracks);
