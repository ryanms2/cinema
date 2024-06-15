import { RequestToken } from './_components/request-token'

export default function page({
  searchParams,
}: {
  searchParams?: {
    request_token?: string
    approved?: string
  }
}) {
  return <RequestToken searchParams={searchParams} />
}
