'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams()
  const timeParam = searchParams.get('time') || '60'
  const [time, setTime] = useState(parseInt(timeParam))

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) setTime(time - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [time])

  return (
    <main className={styles.main}>
      <div className={`${styles.countDown} ${time>0 ? styles.active : styles.inactive} `}>
        <div>{time}</div>
      </div>
    </main>
  );
}
