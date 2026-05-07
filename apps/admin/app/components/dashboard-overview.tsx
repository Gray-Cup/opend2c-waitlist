'use client'

import Link from 'next/link'
import { Heading, Text } from '@medusajs/ui'
import { useDashboardCounts } from '@/lib/hooks/use-submissions'

export function DashboardOverview() {
  const { counts, isLoading } = useDashboardCounts()

  const waitlistCount = counts.find(c => c.table === 'waitlist')?.count ?? 0

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <Heading level="h1" className="mb-2">Dashboard</Heading>
        <Text className="text-ui-fg-subtle">OpenD2C waitlist overview</Text>
      </div>

      <Link
        href="/waitlist"
        className="block p-6 bg-ui-bg-base rounded-lg border border-ui-border-base hover:shadow-sm transition-shadow"
      >
        <Text className="text-xs text-ui-fg-subtle mb-1 uppercase tracking-wide">Pending entries</Text>
        <div className="flex items-baseline gap-2">
          <Text className="text-3xl font-semibold text-ui-fg-base">
            {isLoading ? '...' : waitlistCount}
          </Text>
          <Text className="text-sm text-ui-fg-muted">not yet contacted</Text>
        </div>
        <Text className="text-xs text-ui-fg-muted mt-3">View all waitlist entries →</Text>
      </Link>
    </div>
  )
}
