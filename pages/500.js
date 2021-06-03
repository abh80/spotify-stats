import Head from "next/head";
export default function InternalServerError() {
  return (
    <>
      <Head>
        <title>500 - Internal Server Error</title>
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
          <h1>An error has occured from our side | Please try again later</h1>
        </div>
      </div>
    </>
  );
}
