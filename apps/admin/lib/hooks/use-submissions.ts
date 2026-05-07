import useSWR, { mutate } from 'swr'

const fetcher = (url: string) => fetch(url, { cache: 'no-store' }).then(res => res.json())

interface UseSubmissionsOptions {
  table: string
  resolved?: 'true' | 'false' | null
}

export interface TableCount {
  table: string
  label: string
  href: string
  count: number
}

export function useSubmissions({ table, resolved }: UseSubmissionsOptions) {
  const resolvedParam = resolved ? `&resolved=${resolved}` : ''
  const key = `/api/submissions?table=${table}${resolvedParam}`

  const { data, error, isLoading, isValidating } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 1000,
  })

  return {
    data: data?.data ?? [],
    error,
    isLoading,
    isValidating,
    mutate: () => mutate(key),
  }
}

export function useDashboardCounts() {
  const { data, error, isLoading, mutate: mutateCounts } = useSWR<{ counts: TableCount[] }>(
    '/api/dashboard/counts',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 1000,
    }
  )

  return {
    counts: data?.counts ?? [] as TableCount[],
    error,
    isLoading,
    mutate: mutateCounts,
  }
}

export async function revalidateAllCaches(table?: string) {
  const tables = table ? [table] : ['waitlist']

  const promises: Promise<unknown>[] = []
  for (const t of tables) {
    promises.push(
      mutate(`/api/submissions?table=${t}`),
      mutate(`/api/submissions?table=${t}&resolved=true`),
      mutate(`/api/submissions?table=${t}&resolved=false`),
    )
  }
  promises.push(mutate('/api/dashboard/counts'))

  await Promise.all(promises)
}

export async function updateSubmission(
  table: string,
  id: string,
  resolved: boolean,
  currentFilter: string | null
) {
  const resolvedParam = currentFilter ? `&resolved=${currentFilter}` : ''
  const key = `/api/submissions?table=${table}${resolvedParam}`

  await mutate(
    key,
    async (currentData: { data: Record<string, unknown>[] } | undefined) => {
      await fetch('/api/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table, id, resolved }),
      })

      if (!currentData?.data) return currentData

      return {
        ...currentData,
        data: currentData.data.map(item =>
          item.id === id ? { ...item, resolved } : item
        ),
      }
    },
    { revalidate: true }
  )

  await revalidateAllCaches(table)
}

export async function deleteSubmission(
  table: string,
  id: string,
  currentFilter: string | null
) {
  const resolvedParam = currentFilter ? `&resolved=${currentFilter}` : ''
  const key = `/api/submissions?table=${table}${resolvedParam}`

  await mutate(
    key,
    async (currentData: { data: Record<string, unknown>[] } | undefined) => {
      await fetch(`/api/submissions?table=${table}&id=${id}`, {
        method: 'DELETE',
      })

      if (!currentData?.data) return currentData

      return {
        ...currentData,
        data: currentData.data.filter(item => item.id !== id),
      }
    },
    { revalidate: true }
  )

  await revalidateAllCaches(table)
}
