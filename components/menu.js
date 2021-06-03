import styles from "../styles/Component.module.css";
import MenuButton from "./menu/button";
import { useRouter } from "next/router";
const Items = require("../menuItems");

export default function Menu({ activeKey }) {
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
    </div>
  );
}
