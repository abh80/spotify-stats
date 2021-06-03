import "../styles/globals.css";
import App from "next/app";
import { wrapper } from "../redux/store";
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
