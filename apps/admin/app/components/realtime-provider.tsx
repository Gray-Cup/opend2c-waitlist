'use client'

import { useEffect } from 'react'
import { revalidateAllCaches } from '@/lib/hooks/use-submissions'

export function RealtimeProvider() {
  useEffect(() => {
    const interval = setInterval(() => {
      revalidateAllCaches()
    }, 30_000)

    return () => clearInterval(interval)
  }, [])

  return null
}
