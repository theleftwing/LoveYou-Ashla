"use client"

import { useEffect, useRef, useState } from "react"
import { valentineDays } from "@/data/valentineDays"

export default function Home() {
  const [todayData, setTodayData] = useState(null)
  const [todayKey, setTodayKey] = useState(null)
  const [countdown, setCountdown] = useState(null)
  const audioRef = useRef(null)

  /* 📅 Detect today's key */
  useEffect(() => {
    const today = new Date()
    const key =
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0")

    setTodayKey(key)

    const data = valentineDays[key]
    if (data) setTodayData(data)
  }, [])

  /* ⏳ Countdown before Feb 7 */
  useEffect(() => {
    const targetDate = new Date(new Date().getFullYear(), 1, 7) // Feb 7
    const now = new Date()

    if (now >= targetDate) return

    const interval = setInterval(() => {
      const current = new Date()
      const diff = targetDate - current

      if (diff <= 0) {
        clearInterval(interval)
        setCountdown(null)
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  /* 🎵 Smooth music fade */
  useEffect(() => {
    if (!todayData?.music) return

    const audio = new Audio(todayData.music)
    audio.loop = true
    audio.volume = 0
    audio.play().catch(() => {})

    let volume = 0
    const fadeIn = setInterval(() => {
      if (volume < 1) {
        volume += 0.05
        audio.volume = volume
      } else clearInterval(fadeIn)
    }, 200)

    audioRef.current = audio

    return () => {
      const fadeOut = setInterval(() => {
        if (audio.volume > 0) {
          audio.volume -= 0.05
        } else {
          audio.pause()
          clearInterval(fadeOut)
        }
      }, 200)
    }
  }, [todayData])

  /* 🌹 Dynamic favicon + theme color */
  useEffect(() => {
    if (!todayData) return

    const link =
      document.querySelector("link[rel='icon']") ||
      document.createElement("link")

    link.rel = "icon"

    const todayKey =
      String(new Date().getMonth() + 1).padStart(2, "0") +
      "-" +
      String(new Date().getDate()).padStart(2, "0")

    const emoji =
      todayKey === "02-07" ? "🌹" :
      todayKey === "02-10" ? "🧸" :
      todayKey === "02-13" ? "💋" :
      todayKey === "02-14" ? "❤️" :
      "💖"

    link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`
    document.head.appendChild(link)

    let metaTheme = document.querySelector("meta[name='theme-color']")
    if (!metaTheme) {
      metaTheme = document.createElement("meta")
      metaTheme.name = "theme-color"
      document.head.appendChild(metaTheme)
    }
    metaTheme.content = todayData.color
  }, [todayData])

  return (
    <div className="valentine-wrapper">

      {/* 💖 Default Floating Hearts */}
      <div className="heart h1">💖</div>
      <div className="heart h2">💗</div>
      <div className="heart h3">💘</div>
      <div className="heart h4">💕</div>
      <div className="heart h5">💞</div>
      <div className="heart h6">❤️</div>
      <div className="heart h7">💓</div>
      <div className="heart h8">💝</div>
      <div className="heart h9">💖</div>
      <div className="heart h10">💗</div>

      {/* 🧸 TEDDY DAY */}
      {todayKey === "02-10" && (
        <div className="teddy-container">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={`teddy t${i}`}>🧸</span>
          ))}
        </div>
      )}

      {/* 💋 KISS DAY */}
      {todayKey === "02-13" && (
        <div className="kiss-container">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className={`kiss k${i}`}>💋</span>
          ))}
        </div>
      )}

      {/* ❤️ VALENTINE’S DAY */}
      {todayKey === "02-14" && (
        <div className="heart-rain">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className={`drop d${i}`}>❤️</span>
          ))}
        </div>
      )}

      {/* ✨ Sparkles */}
      <div className="sparkles">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className={`spark s${i}`} />
        ))}
      </div>

      {/* 💎 Glass Card */}
      <div className="glass-card">
        <div className={`emoji ${todayKey === "02-14" ? "heartbeat" : ""}`}>
          {todayData ? "🌹" : "💌"}
        </div>

        <h1>{todayData ? todayData.title : "Come Back on Valentine Week"}</h1>

        {todayData ? (
          <p>{todayData.message}</p>
        ) : countdown ? (
          <div className="countdown">
            <p className="countdown-title">💌 Valentine Week begins in</p>
            <p className="countdown-timer">
              {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
            </p>
          </div>
        ) : (
          <p>Something beautiful is waiting for you ❤️</p>
        )}
      </div>
    </div>
  )
}

