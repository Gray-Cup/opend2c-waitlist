import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { waitlist } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

const tableMap = { waitlist } as const
type ValidTable = keyof typeof tableMap
const validTables: ValidTable[] = ['waitlist']

function isValidTable(t: string | null): t is ValidTable {
  return validTables.includes(t as ValidTable)
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const table = searchParams.get('table')
  const resolved = searchParams.get('resolved')

  if (!isValidTable(table)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 })
  }

  try {
    const tbl = tableMap[table]
    let data

    if (resolved === 'true') {
      data = await db.select().from(tbl).where(eq(tbl.resolved, true)).orderBy(desc(tbl.created_at))
    } else if (resolved === 'false') {
      data = await db.select().from(tbl).where(eq(tbl.resolved, false)).orderBy(desc(tbl.created_at))
    } else {
      data = await db.select().from(tbl).orderBy(desc(tbl.created_at))
    }

    return NextResponse.json({ data }, {
      headers: {
        'Cache-Control': 'private, max-age=31536000, stale-while-revalidate=31536000',
      },
    })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const body = await request.json()
  const { table, id, resolved } = body

  if (!isValidTable(table)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 })
  }
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }
  if (typeof resolved !== 'boolean') {
    return NextResponse.json({ error: 'Invalid resolved value' }, { status: 400 })
  }

  try {
    const tbl = tableMap[table]
    await db.update(tbl).set({ resolved }).where(eq(tbl.id, id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating submission:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const table = searchParams.get('table')
  const id = searchParams.get('id')

  if (!isValidTable(table)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 })
  }
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  try {
    const tbl = tableMap[table]
    await db.delete(tbl).where(eq(tbl.id, id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting submission:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
