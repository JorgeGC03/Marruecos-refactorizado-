"use client"
import { useEffect, useState } from "react"

export function ProgressIndicator() {
  const [scroll, setScroll] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      setScroll(scrolled)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 h-1 bg-[#9c6644] z-50 transition-[width]"
      style={{ width: `${scroll}%` }}
    />
  )
}
