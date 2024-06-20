import { Suspense } from 'react'
import { ComponentPage } from './_components/component_page'
import { MoviePageSkeleton } from '../ui/skeletons'

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  return (
    <Suspense fallback={<MoviePageSkeleton />}>
      <ComponentPage searchParams={searchParams} />
    </Suspense>
  )
}
