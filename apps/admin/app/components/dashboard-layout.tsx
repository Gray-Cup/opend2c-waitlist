'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button, Text, IconButton } from '@medusajs/ui'
import { BarsThree, XMark } from '@medusajs/icons'
import { RealtimeProvider } from './realtime-provider'
import { useDashboardCounts } from '@/lib/hooks/use-submissions'
import { siteConfig } from '@/lib/site.config'

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Waitlist', href: '/waitlist', table: 'waitlist' },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { counts } = useDashboardCounts()

  const pendingCount = counts.find(c => c.table === 'waitlist')?.count ?? 0

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="min-h-screen bg-ui-bg-subtle">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-ui-bg-overlay z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-64 bg-ui-bg-base border-r border-ui-border-base z-50
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-4 h-14 border-b border-ui-border-base flex items-center justify-between">
            <span className="font-bold text-ui-fg-base">
              Open<span className="text-green-600">D2C</span>
              <span className="ml-1.5 text-xs font-normal text-ui-fg-muted">Admin</span>
            </span>
            <IconButton variant="transparent" className="lg:hidden" onClick={closeSidebar}>
              <XMark />
            </IconButton>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-3 space-y-0.5">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const count = item.table ? (counts.find(c => c.table === item.table)?.count ?? 0) : 0
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`
                    flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors
                    ${isActive
                      ? 'bg-ui-bg-subtle text-ui-fg-base font-medium'
                      : 'text-ui-fg-subtle hover:text-ui-fg-base hover:bg-ui-bg-subtle-hover'
                    }
                  `}
                >
                  <span>{item.name}</span>
                  {count > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-medium bg-orange-100 text-orange-700 rounded-full">
                      {count > 99 ? '99+' : count}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-ui-border-base">
            <Button variant="secondary" className="w-full text-sm" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:pl-64 min-h-screen">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 lg:hidden bg-ui-bg-base border-b border-ui-border-base px-3 h-14 flex items-center gap-2">
          <IconButton variant="transparent" onClick={() => setSidebarOpen(true)}>
            <BarsThree />
          </IconButton>
          <span className="text-sm font-semibold text-ui-fg-base">
            Open<span className="text-green-600">D2C</span> Admin
          </span>
          {pendingCount > 0 && (
            <span className="ml-auto inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
              {pendingCount}
            </span>
          )}
        </div>

        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>

      <RealtimeProvider />
    </div>
  )
}
