import "../styles/globals.css";
import App from "next/app";
import { wrapper } from "../redux/store";
import TitleBar from "../components/titlebar";
import { useEffect, useState } from "react";
function MyApp({ Component, pageProps }) {

  return (
    <>
      <TitleBar  />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
