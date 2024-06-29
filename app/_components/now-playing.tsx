/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/ui/button'
import { fetchNowPlayingMovies } from '@/lib/data'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { HomePageSkeletonMovie } from '../ui/skeletons'

export function NowPlaying() {
  const [tipo, setTipo] = useState('streaming')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  const shuffleMovies = (moviesArray: any) => {
    for (let i = moviesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[moviesArray[i], moviesArray[j]] = [moviesArray[j], moviesArray[i]]
    }
    return moviesArray
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await fetchNowPlayingMovies(tipo).then((res: any) => {
        const shuffledMovies = shuffleMovies(res.results)
        setMovies(shuffledMovies)
        setLoading(false)
      })
    }

    if (tipo) {
      fetchData()
    }
  }, [tipo])

  return (
    <div className="bg-white p-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold">Os Mais Populares</h2>
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 lg:space-x-2">
          <div className="flex space-x-2">
            <Button
              className={`${tipo === 'streaming' ? 'bg-blue-600' : 'bg-gray-200'} text-white`}
              onClick={() => {
                setTipo('streaming')
              }}
            >
              Streaming
            </Button>
            <Button
              className={`${tipo === 'naTv' ? 'bg-blue-600' : 'bg-gray-200'} text-white`}
              onClick={() => {
                setTipo('naTv')
              }}
            >
              Na TV
            </Button>
            <Button
              className={`${tipo === 'alugar' ? 'bg-blue-600' : 'bg-gray-200'} text-white`}
              onClick={() => {
                setTipo('alugar')
              }}
            >
              Para Alugar
            </Button>
            <Button
              className={`${tipo === 'cinema' ? 'bg-blue-600' : 'bg-gray-200'} text-white`}
              onClick={() => {
                setTipo('cinema')
              }}
            >
              Nos Cinemas
            </Button>
          </div>
        </div>
      </div>
      {loading ? (
        <HomePageSkeletonMovie />
      ) : (
        <div className="flex overflow-x-auto w-full mt-4 space-x-4 md:space-x-6 lg:max-w-none  lg:space-x-8">
          {movies.map((movie: any, index: number) => (
            <Link href={`/movie/${movie.id}`} key={index}>
              <div
                className="relative"
                style={{ width: '200px', flexShrink: 0 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(0.9)'
                  e.currentTarget.style.transition =
                    'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  e.currentTarget.style.filter = 'brightness(80%)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.transition = 'transform 0.5s'
                  e.currentTarget.style.filter = 'brightness(100%)'
                }}
              >
                <img
                  src={`https://media.themoviedb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg shadow-lg object-cover"
                  style={{ width: '200px', height: '300px' }}
                />
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-bl-lg">
                  {movie.vote_average.toFixed(1)} ★
                </div>
                <div className="mt-2 text-sm">
                  <p className="font-bold">{movie.title}</p>
                  <p>
                    {format(new Date(movie.release_date), 'dd MMM yyyy', {
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
