"use client"
import { useEffect, useState } from "react"

export function useMobile(breakpointPx = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${breakpointPx}px)`)
    const listener = () => setIsMobile(mq.matches)
    listener()
    mq.addEventListener("change", listener)
    return () => mq.removeEventListener("change", listener)
  }, [breakpointPx])

  return isMobile
}
