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

export function Recomendations({ idMovie }: { idMovie: string }) {
  const [movies, setMovies] = useState<Movie | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const total = await fetchRecomendations(idMovie || '')
      setMovies(total)
    }
    fetchData()
  }, [idMovie])

  return (
    <div className="bg-white dark:bg-zinc-800 p-4">
      <>
        <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
          Recomendações
        </h2>
        <div className="flex overflow-x-auto gap-4">
          {movies?.results.map((movie: any) => (
            <div
              className="flex-none w-48 bg-zinc-100 dark:bg-zinc-700 rounded-lg p-2"
              key={movie.id}
            >
              <img
                className="w-full h-100 object-cover rounded-lg"
                src={`https://media.themoviedb.org/t/p/w300${movie?.backdrop_path}`}
                alt={movie.title}
              />
              <div className="mt-2 text-center">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {movie.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    </div>
  )
}
