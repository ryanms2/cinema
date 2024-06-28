/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/ui/button'
import { fetchTrailerMovies, fetchVideoTrailersForId } from '@/lib/data'
import { useEffect, useState, useCallback } from 'react'
import { HomePageSkeletonMovie } from '@/app/ui/skeletons'

export function Trailers() {
  const [tipo, setTipo] = useState('streaming')
  const [movies, setMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const shuffleMovies = useCallback((moviesArray: any[]) => {
    for (let i = moviesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[moviesArray[i], moviesArray[j]] = [moviesArray[j], moviesArray[i]]
    }
    return moviesArray
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await fetchTrailerMovies(tipo)
      const shuffledMovies = shuffleMovies(res.results)
      const moviesWithTrailers = await Promise.all(
        shuffledMovies.map(async (movie: any) => {
          const trailers = await fetchVideoTrailersForId(movie.id)
          return { ...movie, trailers: trailers.slice(0, 1) }
        }),
      )
      setMovies(
        moviesWithTrailers.filter((movie: any) => movie.trailers.length > 0),
      )
      setLoading(false)
    }

    if (tipo) {
      fetchData()
    }
  }, [tipo, shuffleMovies])

  const handleBackgroundImage = useCallback(
    (element: HTMLElement | null, movie: any) => {
      if (element && movie && movie.backdrop_path) {
        element.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        element.style.backgroundSize = 'cover'
        element.style.filter = 'brightness(90%)'
        element.style.transition = 'background-image 0.5s'
      } else {
        if (element) {
          element.style.backgroundImage = ''
        }
      }
    },
    [],
  )

  const handleModal = useCallback((trailerKey: string) => {
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
  }, [])

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
      {loading ? (
        <div className="flex p-3 rounded-sm overflow-x-auto w-full h-full mt-4 space-x-4 md:space-x-6 lg:max-w-none  lg:space-x-8 bg-zinc-900">
          <HomePageSkeletonMovie />
        </div>
      ) : (
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
      )}
    </div>
  )
}
