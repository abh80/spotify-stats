import styles from "../styles/Component.module.css";
export default function Loader({ styleApply }) {
  return <div className={styles.loader} style={styleApply}></div>;
}
