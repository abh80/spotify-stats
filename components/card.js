import { useRouter } from "next/router";
import styles from "../styles/Component.module.css";
export default function Card({ image, title, description, href }) {
  const router = useRouter();
  return (
    <div className={styles["display-card"]} onClick={() => router.push(href)}>
      <div className="lg:w-2/5 hbs">
        <div
          className={"h-full " + styles.card_media}
          style={{
            backgroundImage: `url("${image}")`,
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
      <div className="flex-1 space-y-3 py-3 px-2 mx-10">
        <div className="mx-1" style={{ fontSize: "1.2em", fontWeight: "bold" }}>
          {title}
        </div>
        <div style={{ fontWeight: "600" }}>{description}</div>
      </div>
    </div>
  );
}
