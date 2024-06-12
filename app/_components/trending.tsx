/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Trending() {
  const [tipo, setTipo] = useState('day')
  const [movies, setMovies] = useState([])

  const fetchMovies = async (tipo: any) => {
    let url
    if (tipo === 'day') {
      url = 'https://api.themoviedb.org/3/trending/movie/day?language=pt-br'
    }

    if (tipo === 'week') {
      url = 'https://api.themoviedb.org/3/trending/movie/week?language=pt-br'
    }

    const options = {
      method: 'GET',
      url,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
      },
    }

    try {
      const response = await axios.request(options)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const shuffleMovies = (moviesArray: any) => {
    for (let i = moviesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[moviesArray[i], moviesArray[j]] = [moviesArray[j], moviesArray[i]]
    }
    return moviesArray
  }

  useEffect(() => {
    fetchMovies(tipo).then((res: any) => {
      const shuffledMovies = shuffleMovies(res.results)
      setMovies(shuffledMovies)
    })
  }, [tipo])

  return (
    <div className="bg-white p-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold">Tendências</h2>
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 lg:space-x-2">
          <div className="flex space-x-2">
            <Button
              className={`${tipo === 'day' ? 'bg-blue-600' : 'bg-gray-200'} text-white`}
              onClick={() => {
                setTipo('day')
              }}
            >
              Hoje
            </Button>
            <Button
              className={`${tipo === 'week' ? 'bg-blue-600' : 'bg-gray-200'} text-white`}
              onClick={() => {
                setTipo('week')
              }}
            >
              Na semana
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-full mt-4 space-x-4 md:space-x-6 lg:max-w-none  lg:space-x-8 overflow-x-auto">
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
    </div>
  )
}
