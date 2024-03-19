'use client'

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams()
  // const timeParam = parseInt(searchParams.get('time') ? searchParams.get('time') as string : '60')
  const isNumber = /\d+/
  const isDate = /\d{8}/
  const hour = searchParams.get('h') && isNumber.test(searchParams.get('h') as string) ? searchParams.get('h') as string : '0'
  const minute = searchParams.get('m') && isNumber.test(searchParams.get('m') as string) ? searchParams.get('m') as string : '0'
  const second = searchParams.get('s')  && isNumber.test(searchParams.get('s') as string) ? searchParams.get('s') as string : '0'
  const timeParam = parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second)
  const [time, setTime] = useState(timeParam)

  const dateParam = searchParams.get('date') && isDate.test(searchParams.get('date') as string) ? searchParams.get('date') as string : '0'
  const dday = dateParam ? new Date(parseInt(dateParam.slice(0,4)), parseInt(dateParam.slice(4,6))-1, parseInt(dateParam.slice(6,8))) : new Date()
  const [today, setToday] = useState(dday)
  const leftTime = dateParam && dday && today ? Math.floor((dday.getTime() - today.getTime()) / 1000) : 0; 

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) setTime(time - 1)
      setToday(() => new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [time, today])

  return (
    <main className={styles.main}>
      <div className={`${styles.countDown} ${time>0 || leftTime>0 ? styles.active : styles.inactive} `}>
        <div>{dateParam ?
        `
        ${
          Math.floor(leftTime / (60 * 60 * 24))
        } Day${Math.floor(leftTime / (60 * 60 * 24)) > 1 ? 's' : ''}
        ${
          Math.floor(leftTime / 3600) > 0 ?
          ('0' + Math.floor(Math.floor(leftTime % (24 * 3600)) / 3600) + ':').slice(-3) : ''
        }${('0' + (Math.floor(Math.floor(leftTime % (24 * 3600)) / 60) % 60)).slice(-2)}:${('0' + Math.floor(leftTime % (24 * 3600)) % 60).slice(-2)}
        ` :
        `
          ${
            Math.floor(time / 3600) > 0 ?
            ('0' + Math.floor(time / 3600) + ':').slice(-3) : ''
          }${('0' + (Math.floor(time / 60) % 60)).slice(-2)}:${('0' + time % 60).slice(-2)}`}</div>
      </div>
    </main>
  );
}
