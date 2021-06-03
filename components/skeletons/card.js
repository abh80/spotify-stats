import styles from "../../styles/Component.module.css";
export default function Card() {
  return (
    <div className={styles["display-card"]}>
      <div className="lg:w-2/5 hbs">
        <div
          className={"h-full card-image animate-pulse"}
          style={{
            marginLeft: "-50px",
            backgroundSize: "fit",
            transform: "skew(-30deg, 0deg)",
            background: "rgb(103, 105, 109)",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
      <div className="flex-1 space-y-4 py-3 px-3 animate-pulse">
        <div className="h-4 bg-cardover rounded w-2/3 mx-10"></div>
        <div className="flex mx-10 gap-2">
          <div className="h-4 bg-cardover rounded w-3/4"></div>
          <div className="h-4 bg-cardover rounded w-1/2"></div>
        </div>
        <div className="h-4 bg-cardover rounded w-3/4 mx-10"></div>
        <div className="h-4 bg-cardover rounded w-1/4 mx-10"></div>
        <div className="h-4 bg-cardover rounded w-2/4 mx-10"></div>
      </div>
    </div>
  );
}
