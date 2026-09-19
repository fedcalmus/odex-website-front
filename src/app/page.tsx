import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className="app">
        <header>
          <h1>My Website</h1>
        </header>

        <main>
          <h2>Homepage</h2>
          <p>Welcome to my website.</p>
        </main>
      </div>
    </div>
  );
}
