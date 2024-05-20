/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import { fetchRecomendations } from '@/lib/dataMovieDetails'
import { useState, useEffect } from 'react'

interface Movie {
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

export function Recomendations() {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const total = await fetchRecomendations(823464)
      setMovie(total)
    }
    fetchData()
  }, [])

  return (
    <div className="bg-white dark:bg-zinc-800 p-4">
      <>
        <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
          Recomendações
        </h2>
        <div className="flex overflow-x-auto gap-4">
          {movie?.results.map((item: any) => (
            <div
              className="flex-none w-48 bg-zinc-100 dark:bg-zinc-700 rounded-lg p-2"
              key={item.id}
            >
              <img
                className="w-full h-32 object-cover rounded-lg"
                src="https://placehold.co/150x150"
                alt="Rebecca Hall"
              />
              <div className="mt-2 text-center">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {item.title}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  Dr. Ilene Andrews
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    </div>
  )
}
