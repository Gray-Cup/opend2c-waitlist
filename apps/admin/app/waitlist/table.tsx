'use client'

import { DataTable } from '@/app/components/data-table'
import { PageHeader } from '@/app/components/page-header'
import { DownloadButton } from '@/app/components/download-button'
import { Text } from '@medusajs/ui'

const columns = [
  { key: 'person_name', label: 'Name' },
  { key: 'company_name', label: 'Company' },
  { key: 'email', label: 'Email' },
  { key: 'gst_number', label: 'GST' },
  {
    key: 'website',
    label: 'Website',
    render: (value: unknown) =>
      value ? (
        <a
          href={String(value)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm truncate max-w-[160px] block"
        >
          {String(value).replace(/^https?:\/\//, '')}
        </a>
      ) : (
        <Text className="text-ui-fg-muted text-sm">—</Text>
      ),
  },
  {
    key: 'platforms',
    label: 'Platforms',
    render: (value: unknown) => {
      const arr = Array.isArray(value) ? value : []
      if (arr.length === 0) return <Text className="text-ui-fg-muted text-sm">—</Text>
      const labels: Record<string, string> = {
        amazon: 'Amazon',
        flipkart: 'Flipkart',
        meesho: 'Meesho',
        quick_commerce: 'Quick Commerce',
        other: 'Other',
      }
      return (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {arr.map((p: string) => (
            <span
              key={p}
              className="inline-block px-1.5 py-0.5 text-[11px] bg-ui-bg-subtle rounded border border-ui-border-base text-ui-fg-subtle"
            >
              {labels[p] ?? p}
            </span>
          ))}
        </div>
      )
    },
  },
]

export function WaitlistTable() {
  return (
    <>
      <PageHeader
        title="Waitlist"
        description="Brands that signed up for early access to OpenD2C"
        action={<DownloadButton tableName="waitlist" title="Waitlist" />}
      />
      <DataTable tableName="waitlist" columns={columns} title="Waitlist entries" />
    </>
  )
}
