/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CardHeader, CardFooter, Card } from '@/components/ui/card'
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
          <Card className="w-[140px]" key={index}>
            <img
              alt={movie.title}
              className="rounded-t-lg"
              height="210"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              style={{
                aspectRatio: '140/210',
                objectFit: 'cover',
              }}
              width="140"
            />
            <CardHeader>
              <Badge className="relative" variant="secondary">
                {movie.vote_average}{' '}
                <span className="absolute right-0 top-0  text-black rounded-full p-1">
                  ★
                </span>
              </Badge>
              <div className="flex justify-between items-center mt-2">
                <h5 className="text-sm font-bold">{movie.title}</h5>
                <MoreVerticalIcon className="text-gray-500" />
              </div>
            </CardHeader>
            <CardFooter className="text-xs">
              <p>{movie.release_date}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function MoreVerticalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  )
}
