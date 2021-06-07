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
class TopTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.state,
      ...this.props.apiReducer,
    };
  }
  onReady() {}
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
  render() {
    const { set } = this.props;
    return (
      <>
        {!this.state.ready ? (
          <Loader source={this} setReduxState={set} MetaData = {{url : "app/toptracks" , title : "Top Tracks"}}/>
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
            content="https://spotify-stats-omega.vercel.app/spotify/brand/assets/Spotify_Icon_RGB_Green.png"
          />
          <meta
            property="og:image:alt"
            content="Spotify Stats - All your Spotify Statistics at one place!"
          />
        </Head>
        <div className="fullscreen flex">
          <Menu />
        </div>
      </>
    );
  }
}

export default connect((state) => state, { setTop, set: setState })(TopTracks);
