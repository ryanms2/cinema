import { ComponentPage } from './_components/component_page'

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  return <ComponentPage searchParams={searchParams} />
}
