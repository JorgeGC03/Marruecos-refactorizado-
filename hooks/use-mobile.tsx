"use client"

import { useEffect, useState } from "react"

/**
 * Detect whether the viewport width is smaller than the provided breakpoint
 * (default = 640 px, Tailwind’s `sm`).
 */
export function useMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < breakpoint)
    handle()
    window.addEventListener("resize", handle)
    return () => window.removeEventListener("resize", handle)
  }, [breakpoint])

  return isMobile
}
