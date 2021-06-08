import styles from "../styles/Component.module.css";
import MenuButton from "./menu/button";
import { useRouter } from "next/router";
import { version } from "../package.json";
const Items = require("../menuItems");
import platform from "platform";
export default function Menu() {
  const router = useRouter();
  return (
    <div className={styles.side_menu + " fullscreen"}>
      <div className={styles["menu-header"] + " flex gap-3"}>
        <img
          src="/spotify/brand/assets/Spotify_Icon_RGB_White.png"
          style={{ height: "60px", width: "60px" }}
          alt="Spotify Icon"
        />
        <p
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            position: "relative",
            top: "10px",
          }}
        >
          Spotify Stats
        </p>
      </div>
      <div className="grid grid-rows-10 gap-5">
        {Items.map((x, l) => {
          return (
            <MenuButton
              key={l}
              name={x.name}
              href={x.href}
              active={router.pathname == x.href}
            />
          );
        })}
      </div>
      <div
        style={{
          bottom: 0,
          right: 0,
          left: 0,
          position: "absolute",
          marginBottom: "20px",
          height: "70px",
          minHeight: "70px",
          marginLeft: "20px",
        }}
      >
        <div style={{ fontSize: "16px", fontWeight: 600 }}>V{version}</div>
        <div style={{ fontSize: "16px", fontWeight: 600 }}>
          {window.OS
            ? window.OS
            : platform.parse(window.navigator.userAgent).os.toString()}
        </div>
      </div>
    </div>
  );
}
