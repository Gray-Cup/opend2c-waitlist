import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { DashboardLayout } from '@/app/components/dashboard-layout'
import { WaitlistTable } from './table'

export default async function WaitlistPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <DashboardLayout>
      <WaitlistTable />
    </DashboardLayout>
  )
}
