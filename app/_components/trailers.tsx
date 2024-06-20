/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function Trailers() {
  const [tipo, setTipo] = useState('streaming')
  const [movies, setMovies] = useState<any[]>([])

  const fetchMovies = async (tipo: string) => {
    const urls: { [key: string]: string } = {
      cinema:
        'https://api.themoviedb.org/3/movie/upcoming?language=pt-br&page=1',
      streaming:
        'https://api.themoviedb.org/3/movie/popular?language=pt-br&page=1',
      naTv: 'https://api.themoviedb.org/3/movie/now_playing?language=pt-br&page=1',
      alugar:
        'https://api.themoviedb.org/3/movie/top_rated?language=pt-br&page=1',
    }

    const url = urls[tipo]

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

  const fetchTrailers = async (movieId: number) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=pt-br`
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
      return response.data.results
    } catch (error) {
      console.error(error)
    }
  }

  const shuffleMovies = (moviesArray: any[]) => {
    for (let i = moviesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[moviesArray[i], moviesArray[j]] = [moviesArray[j], moviesArray[i]]
    }
    return moviesArray
  }

  useEffect(() => {
    fetchMovies(tipo).then(async (res: any) => {
      const shuffledMovies = shuffleMovies(res.results)
      const moviesWithTrailers = await Promise.all(
        shuffledMovies.map(async (movie: any) => {
          const trailers = await fetchTrailers(movie.id)
          return { ...movie, trailers: trailers.slice(0, 1) }
        }),
      )
      setMovies(
        moviesWithTrailers.filter((movie: any) => movie.trailers.length > 0),
      )
    })
  }, [tipo])

  const handleBackgroundImage = (element: HTMLElement | null, movie: any) => {
    if (element) {
      element.style.backgroundImage = movie.backdrop_path
        ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        : ''
      element.style.backgroundSize = 'cover'
      element.style.filter = 'brightness(90%)'
      element.style.transition = 'background-image 0.5s'
    }
  }

  const handleModal = (trailerKey: string) => {
    const modal = document.createElement('div')
    modal.style.position = 'fixed'
    modal.style.top = '0'
    modal.style.left = '0'
    modal.style.width = '100%'
    modal.style.height = '100%'
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)'
    modal.style.display = 'flex'
    modal.style.justifyContent = 'center'
    modal.style.alignItems = 'center'
    modal.style.zIndex = '1000'

    const videoPlayer = document.createElement('iframe')
    videoPlayer.src = `https://www.youtube.com/embed/${trailerKey}`
    videoPlayer.width = '80%'
    videoPlayer.height = '80%'
    videoPlayer.style.border = 'none'

    const closeButton = document.createElement('button')
    closeButton.innerText = 'Fechar'
    closeButton.style.position = 'absolute'
    closeButton.style.top = '20px'
    closeButton.style.right = '20px'
    closeButton.style.zIndex = '1001'
    closeButton.style.padding = '10px'
    closeButton.style.borderRadius = '5px'
    closeButton.style.border = 'none'
    closeButton.style.backgroundColor = '#ff0000'
    closeButton.style.color = 'white'
    closeButton.onclick = function () {
      document.body.removeChild(modal)
    }

    modal.appendChild(videoPlayer)
    modal.appendChild(closeButton)
    document.body.appendChild(modal)
  }

  return (
    <div className="bg-white p-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold">Últimos trailers</h2>
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 lg:space-x-2">
          <div className="flex space-x-2">
            {['streaming', 'naTv', 'alugar', 'cinema'].map((type) => (
              <Button
                key={type}
                className={`${
                  tipo === type ? 'bg-blue-600' : 'bg-gray-200'
                } text-white`}
                onClick={() => setTipo(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div
        className="flex p-3 rounded-sm overflow-x-auto w-full h-full mt-4 space-x-4 md:space-x-6 lg:max-w-none  lg:space-x-8 bg-zinc-900"
        style={{
          backgroundImage: movies[movies.length - 1]?.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${movies[movies.length - 1].backdrop_path})`
            : '',
          backgroundSize: 'cover',
          filter: 'brightness(90%)',
          transition: 'background-image 0.5s',
        }}
        onMouseLeave={(e) =>
          handleBackgroundImage(e.currentTarget, movies[movies.length - 1])
        }
      >
        {movies.map((movie: any, index: number) => (
          <div
            className="relative group w-52 h-54 mb-4 flex-shrink-0"
            key={index}
            onMouseEnter={(e) =>
              handleBackgroundImage(e.currentTarget.parentElement, movie)
            }
          >
            <img
              className="relative inset-0 w-full h-full object-cover rounded-lg group-hover:blur-sm"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="absolute inset-0 w-full h-full bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
              <button
                className="bg-white p-1 rounded-full w-10 h-10"
                onClick={() => handleModal(movie.trailers[0].key)}
              >
                <img
                  aria-hidden="true"
                  alt="play"
                  src="https://img.icons8.com/?size=100&id=47815&format=png&color=000000"
                />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-lg font-bold">{movie.title}</h3>
              {movie.trailers.map((trailer: any, trailerIndex: number) => (
                <p
                  key={trailerIndex}
                  className="text-sm cursor-pointer"
                  onClick={() => handleModal(trailer.key)}
                >
                  {trailer.name}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
