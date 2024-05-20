/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import { fetchDetails } from '@/lib/dataMovieDetails'
import { useEffect, useState } from 'react'
import { Recomendations } from './recomendations'
import { MainCast } from './mainCast'

interface Movie {
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

export function ComponentPage() {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const total = await fetchDetails(823464)
      setMovie(total)
    }
    fetchData()
  }, [])

  function openVideoOverlay() {
    const videoUrl = 'https://www.youtube-nocookie.com/embed/va-7FEpUHVQ'
    const overlay = document.createElement('div')
    overlay.style.position = 'fixed'
    overlay.style.top = '0'
    overlay.style.left = '0'
    overlay.style.width = '100%'
    overlay.style.height = '100%'
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
    overlay.style.zIndex = '9999'
    overlay.innerHTML = `
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 70%; height: 70%;">
        <iframe width="100%" height="100%" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
      </div>
      <button style="position: absolute; top: 10px; right: 10px; background-color: #3B82F6; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;" onclick="document.body.removeChild(this.parentNode)">Fechar</button>
    `
    document.body.appendChild(overlay)
  }

  function openInfoOverlay() {
    setShowInfo(true)
  }

  function closeInfoOverlay() {
    setShowInfo(false)
  }

  console.log(movie)
  return (
    <>
      <div
        className="bg-zinc-800 text-white p-6 max-w mx-1 mt-1 rounded-lg shadow-lg relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://media.themoviedb.org/t/p/original${movie?.backdrop_path}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex flex-col items-center">
            <img
              src={`https://media.themoviedb.org/t/p/w300${movie?.poster_path}`}
              alt={movie?.title}
              className="rounded-lg shadow-md"
            />

            <p className="text-center mt-2 text-zinc-400">
              Disponível em:{' '}
              <span className="text-white">Netflix, HBO Max</span>
            </p>
          </div>
          <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
            <h2 className="text-3xl font-bold mb-2">
              {movie?.title ||
                movie?.original_title ||
                movie?.name ||
                movie?.original_name}
            </h2>
            <p className="inline bg-gray-900 rounded-lg p-1">
              PG-13 · {movie?.release_date} (BR) ·{' '}
              {movie?.genres.map((genre) => `${genre.name} `)} · 1h 55m
            </p>
            <div className="flex items-center my-4">
              <span className="bg-green-500 text-white text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-700 dark:text-green-200">
                {movie?.vote_average.toFixed(1)}% Geral dos Utilizadores
              </span>
              <span className="text-sm bg-blue-500 text-white px-3 py-1 rounded-full mr-2">
                👍
              </span>
              <span className="text-sm bg-yellow-500 text-white px-3 py-1 rounded-full">
                😐
              </span>
            </div>
            <div className="flex items-center mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
                onClick={() => openVideoOverlay()}
              >
                <i className="fas fa-play"></i> Ver Trailer
              </button>
              <button
                className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-4 rounded-r"
                onClick={() => openInfoOverlay()}
              >
                <i className="fas fa-info-circle"></i> Mais Informações
              </button>
            </div>
            {showInfo && (
              <div
                className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 absolute mx-auto"
                style={{
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: '1000',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 text-center">
                    Avengers: Endgame
                  </h3>
                  <button
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    onClick={() => closeInfoOverlay()}
                  >
                    <span className="sr-only">Close</span>
                    &times;
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 text-center">
                      Release Status
                    </p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium text-center">
                      Released
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 text-center">
                      Budget
                    </p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium text-center">
                      $400M
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 text-center">
                      Box Office
                    </p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium text-center">
                      $2.798B
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 text-center">
                      Release Date
                    </p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium text-center">
                      April 26, 2019
                    </p>
                  </div>
                </div>
              </div>
            )}
            <p className="mb-4">
              {movie?.tagline} {movie?.overview}
            </p>
            <div className="text-zinc-400">
              <p>
                <strong>Director:</strong> Adam Wingard
              </p>
              <p>
                <strong>Screenplay, Story:</strong> Terry Rossio, Jeremy Slater
              </p>
            </div>
          </div>
        </div>
      </div>
      <MainCast />
      <Recomendations />
    </>
  )
}
