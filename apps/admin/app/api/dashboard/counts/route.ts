import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { waitlist } from '@/db/schema'
import { count, eq } from 'drizzle-orm'

const tables = [
  { table: 'waitlist' as const, label: 'Waitlist', href: '/waitlist' },
]

export async function GET() {
  try {
    const counts = await Promise.all(
      tables.map(async ({ table, label, href }) => {
        const result = await db
          .select({ count: count() })
          .from(waitlist)
          .where(eq(waitlist.resolved, false))

        return { table, label, href, count: Number(result[0]?.count ?? 0) }
      })
    )

    return NextResponse.json({ counts }, {
      headers: {
        'Cache-Control': 'private, max-age=31536000, stale-while-revalidate=31536000',
      },
    })
  } catch (error) {
    console.error('Error fetching counts:', error)
    return NextResponse.json({
      counts: tables.map(({ table, label, href }) => ({ table, label, href, count: 0 }))
    })
  }
}
