/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import { fetchRecomendations } from '@/lib/dataTvDetails'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Tv {
  results: any[]
  poster_path: string
  backdrop_path: string
  title: string
  original_title?: string
  name?: string
  original_name?: string
  vote_average: number
  release_date: string
  tagline: string
  overview: string
  genres: { id: number; name: string }[]
}

export function Recomendations({ idTv }: { idTv: string }) {
  const [tvs, setTvs] = useState<Tv | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const total = await fetchRecomendations(idTv || '')
      setTvs(total)
    }
    fetchData()
  }, [idTv])

  return (
    <div className="bg-white dark:bg-zinc-800 p-4">
      <>
        <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
          Recomendações
        </h2>
        <div className="flex overflow-x-auto gap-4">
          {tvs?.results.map((tv: any) => (
            <Link href={`/tv/${tv.id}`} key={tv.id}>
              <div className="flex-none w-48 bg-zinc-100 dark:bg-zinc-700 rounded-lg p-2 transform transition-transform duration-300 hover:scale-105">
                <img
                  className="w-full h-100 object-cover rounded-lg"
                  src={`https://media.themoviedb.org/t/p/w300${tv?.backdrop_path}`}
                  alt={tv.name || tv.original_name}
                />
                <div className="mt-2 text-center">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {tv.name || tv.original_name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </>
    </div>
  )
}
