import Head from "next/head";
export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Not Found</title>
      </Head>
      <div
        style={{ background: "linear-gradient(45deg,#8c1932,#ff6437 60%)" }}
        className="fullscreen"
      >
        <img src="/Transparent_banner.png" alt="banner" width="200px" height = "200px" />
        <div
          style={{
            margin: "auto",
            position: "relative",
            top: "50%",
            height: "100px",
            marginTop: "-100px",
            textAlign: "center",
            width: "100%",
            fontSize : "1.5em",
            fontWeight : "bold"
          }}
        >
          <h1>This page was never meant to be here</h1>
        </div>
      </div>
    </>
  );
}
