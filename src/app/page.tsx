'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams()
  // const timeParam = parseInt(searchParams.get('time') ? searchParams.get('time') as string : '60')
  const isNumber = /\d+/
  const hour = searchParams.get('h') && isNumber.test(searchParams.get('h') as string) ? searchParams.get('h') as string : '0'
  const minute = searchParams.get('m') && isNumber.test(searchParams.get('m') as string) ? searchParams.get('m') as string : '0'
  const second = searchParams.get('s')  && isNumber.test(searchParams.get('s') as string) ? searchParams.get('s') as string : '0'
  const timeParam = parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second)
  const [time, setTime] = useState(timeParam)

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) setTime(time - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [time])

  return (
    <main className={styles.main}>
      <div className={`${styles.countDown} ${time>0 ? styles.active : styles.inactive} `}>
        <div>{`
          ${
            Math.floor(time / 3600) > 0 ?
            ('0' + Math.floor(time / 3600) + ':').slice(-3) : ''
          }${('0' + (Math.floor(time / 60) % 60)).slice(-2)}:${('0' + time % 60).slice(-2)}`}</div>
      </div>
    </main>
  );
}
