'use client'

import { useEffect } from 'react'
import { supabaseClient } from '@/lib/supabase-client'
import { revalidateAllCaches } from '@/lib/hooks/use-submissions'

export function RealtimeProvider() {
  useEffect(() => {
    const channel = supabaseClient
      .channel('waitlist-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'waitlist' },
        (payload) => {
          console.log('Realtime update on waitlist:', payload.eventType)
          revalidateAllCaches('waitlist')
        }
      )
      .subscribe()

    return () => {
      supabaseClient.removeChannel(channel)
    }
  }, [])

  return null
}
