import Head from "next/head";
import * as Constants from "../Constants";
import Header from "../components/PWAHeader";
export default function NotFound() {
  return (
    <>
    <Header />
      <Head>
        <meta property="og:title" content="Spotify Stats - 404" />
        <meta property="og:site_name" content="Spotify Stats" />
        <meta property="og:url" content={Constants.hostURL} />
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
        <title>404 - Not Found</title>
      </Head>
      <div
        style={{ background: "linear-gradient(45deg,#8c1932,#ff6437 60%)" }}
        className="fullscreen"
      >
        <img
          src="/Transparent_banner.png"
          alt="banner"
          width="200px"
          height="200px"
        />
        <div
          style={{
            margin: "auto",
            position: "relative",
            top: "50%",
            height: "100px",
            marginTop: "-100px",
            textAlign: "center",
            width: "100%",
            fontSize: "1.5em",
            fontWeight: "bold",
          }}
        >
          <h1>This page was never meant to be here</h1>
        </div>
      </div>
    </>
  );
}
