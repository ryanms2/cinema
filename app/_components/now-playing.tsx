/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function NowPlaying() {
  const [tipo, setTipo] = useState('streaming')
  const [movies, setMovies] = useState([])

  const fetchMovies = async (tipo: any) => {
    let url
    if (tipo === 'cinema') {
      url = 'https://api.themoviedb.org/3/movie/upcoming?language=pt-br&page=1'
    }

    if (tipo === 'streaming') {
      url = 'https://api.themoviedb.org/3/movie/popular?language=pt-br&page=1'
    }

    if (tipo === 'naTv') {
      url =
        'https://api.themoviedb.org/3/movie/now_playing?language=pt-br&page=1'
    }

    if (tipo === 'alugar') {
      url = 'https://api.themoviedb.org/3/movie/top_rated?language=pt-br&page=1'
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
      <div className="flex overflow-x-auto w-full max-w-2xl mt-4 space-x-4 md:space-x-6 lg:max-w-none  lg:space-x-8">
        {movies.map((movie: any, index: number) => (
          <div
            className="relative"
            key={index}
            style={{ width: '200px', flexShrink: 0 }}
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
              <p>{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
