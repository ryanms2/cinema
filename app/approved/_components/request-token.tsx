'use client'

export function RequestToken({
  searchParams,
}: {
  searchParams?: {
    request_token?: string
    approved?: string
  }
}) {
  if (searchParams?.request_token) {
    document.cookie = `request_token=${searchParams.request_token}; path=/; secure; samesite=strict`
  }
  if (searchParams?.approved) {
    document.cookie = `approved=${searchParams.approved}; path=/; secure; samesite=strict`
  }
  window.location.href = '/'
  return null
}
