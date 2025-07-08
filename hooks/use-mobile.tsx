"use client"
import { useEffect, useState } from "react"
export function useMobile(breakpoint = 768) {
  const [isMobile, setMobile] = useState(false)
  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < breakpoint)
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [breakpoint])
  return isMobile
}
