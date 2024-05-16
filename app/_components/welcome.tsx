'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function Welcome() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState<string | null>(null)
  const createPageURL = (term: string | null) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    }
    return `search${pathname}?${params.toString()}`
  }
  return (
    <div className="bg-[#1F2937] text-white mt-0.5">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold">Bem-vindo(a).</h1>
        <p className="text-xl my-2">
          Milhões de filmes, séries e pessoas para descobrires. Explora já.
        </p>
        <div className="flex mt-4 mb-8">
          <input
            className="flex-grow p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[rgb(37,99,235)] focus:ring-opacity-50 transition-colors bg-white text-[#1F2937]"
            placeholder="Pesquisar por um filme, uma série televisiva, uma pessoa..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link href={createPageURL(search)}>
            <button className="bg-[rgb(37,99,235)] text-white p-2 rounded-r-lg hover:bg-[#2563EB] transition-colors">
              Search
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-[#2E4055] py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">OSCARS</h2>
          <button className="bg-transparent border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-[#1F2937] transition-colors">
            View the winners
          </button>
        </div>
      </div>
    </div>
  )
}
