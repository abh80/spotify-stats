import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { hostURL , BrandColor } from "../Constants";
export default function HomePage() {
  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 50) {
        document.getElementById("hero").style.height = "25%";
        document.getElementById("font_details_1").style.fontSize = "50px";
        document.getElementById("font_image_1").style.width = "100px";
        document.getElementById("font_image_1").style.height = "100px";
      } else {
        document.getElementById("hero").style.height = "50%";
        document.getElementById("font_details_1").style.fontSize = "100px";
        document.getElementById("font_image_1").style.width = "200px";
        document.getElementById("font_image_1").style.height = "100px";
      }
    };
  });
  return (
    <>
      <Head>
        <meta property="og:title" content="Spotify Stats" />
        <meta property="og:site_name" content="Spotify Stats" />
        <meta property="og:url" content={hostURL} />
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
        <title>Spotify Stats</title>
      </Head>
      <div className={styles.fullScreen}>
        <div className={styles.hero} id="hero">
          <div>
            <div
              className={styles.buttonstart}
              onClick={() => (window.location.href = "/authorize")}
            >
              <p>Get Started</p>
            </div>
          </div>
          <div
            id="font_details_1"
            className="flex gap-10"
            style={{
              marginLeft: "100px",
              position: "relative",
              top: "25%",
              fontFamily: "sans-serif",
              fontSize: "100px",
              minWidth: "200px",
            }}
          >
            <div id="font_image_1" style={{ height: "100px", width: "200px" }}>
              <img
                src="/spotify/brand/assets/Spotify_Icon_RGB_White.png"
                width="100%"
                height="100%"
              ></img>
            </div>
            <div style={{ top: "15px", position: "relative" }}>
              <h1 style={{ minWidth: "200px" }}>Spotify Stats</h1>
              <p
                style={{
                  fontSize: "20px",
                  marginLeft: "4px",
                  position: "relative",
                  top: "-10px",
                }}
              >
                All your Spotify Statistics at one place!
              </p>
            </div>
          </div>
        </div>
        <div style={{ height: "1000px", width: "100%" }}></div>
      </div>
    </>
  );
}
