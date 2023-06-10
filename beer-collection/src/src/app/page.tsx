import Image from "next/image";
import styles from "../styles/home.module.scss";

export const revalidate = 60 * 60 * 12;

export default function Home() {
  return (
    <main className={styles.containerHome}>
      <h1 className="heading-1">
        A collection of beers that{" "}
        <span className="accent-color">stand out</span>
      </h1>
    </main>
  );
}
