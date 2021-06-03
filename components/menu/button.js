import styles from "../../styles/Component.module.css";
import { useRouter } from "next/router";
import next from "next";
export default function MenuButton({ active, name, href }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(href)}
      className={
        styles.menu_button +
        " uppercase transition-all duration-500 rounded-md items-center w-full h-10 text-left text-lg align-middle p-2 py-1 font-bold " +
        (active ? styles.is_active : "")
      }
    >
      {name}
    </button>
  );
}
