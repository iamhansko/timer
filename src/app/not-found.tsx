
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <Link href={"https://giphy.com/embed/ea74cjF0jieXu"}><Image src="/cat.gif" width={300} height={300} alt={"Cat"} /></Link>
      <div className={styles.countDown}>
        <div>
          Page Not Found
        </div>
      </div>
      <footer className={`${styles.sticky} ${styles.footer}`}>
        <Link target="blank" href={"https://github.com/iamhansko/timer?tab=readme-ov-file#how-to-use"}>? How To Use</Link><br/>
        Created By Hyunsu Ko(<Link target="blank" href={"https://github.com/iamhansko/timer"}>GitHub</Link>), 2024
      </footer>
    </main>
  );
}