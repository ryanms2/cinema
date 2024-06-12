/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import {
  fetchDetails,
  fetchMainCast,
  fetchTvTrailer,
  fetchWatchProviders,
} from '@/lib/dataTvDetails'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Recomendations } from './recomendations'
import { MainCast } from './mainCast'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { toast } from '@/components/ui/use-toast'

interface Tv {
  poster_path: string
  backdrop_path: string
  title: string
  original_title?: string
  name?: string
  original_name?: string
  vote_average: number
  first_air_date: string
  tagline: string
  overview: string
  genres: { id: number; name: string }[]
  status: string
  number_of_seasons: number
  number_of_episodes: number
}

export function ComponentPage() {
  const params = useParams()
  const id = String(params.id)
  const [tv, setTv] = useState<Tv | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [principalCast, setPrincipalCast] = useState<any[]>([])
  const [trailerKey, setTrailerKey] = useState<any>([])
  const [provaider, setProvaider] = useState<any>([])

  useEffect(() => {
    const fetchData = async () => {
      const [details, mainCast, trailer, providers] = await Promise.all([
        fetchDetails(id || ''),
        fetchMainCast(id || ''),
        fetchTvTrailer(id),
        fetchWatchProviders(id),
      ])

      setTv(details)
      setProvaider(providers)

      if (mainCast && mainCast.crew) {
        const screenplay = mainCast.crew
          .filter((member: any) => member.job === 'Screenplay')
          .map((member: any) => member.original_name)
        const story = mainCast.crew
          .filter((member: any) => member.job === 'Story')
          .map((member: any) => member.original_name)
        const director = mainCast.crew
          .filter((member: any) => member.known_for_department === 'Directing')
          .map((member: any) => member.original_name)
        const uniqueScreenplay = Array.from(new Set(screenplay))
        const uniqueStory = Array.from(new Set(story))
        const uniqueDirector = Array.from(new Set(director))
        setPrincipalCast([
          { role: 'screenplay', members: uniqueScreenplay },
          { role: 'story', members: uniqueStory },
          { role: 'director', members: uniqueDirector },
        ])
      }

      setTrailerKey(trailer)
    }

    if (params.id) {
      fetchData()
    }
  }, [id, params.id])

  function openVideoOverlay() {
    const videoUrl =
      'https://www.youtube-nocookie.com/embed/' +
      trailerKey.results[0].key +
      '?autoplay=1&mute=1&enablejsapi=1&origin=https://www.themoviedb.org&widgetid=1'
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
  console.log(tv)
  function openInfoOverlay() {
    setShowInfo(true)
  }

  function closeInfoOverlay() {
    setShowInfo(false)
  }
  return (
    <>
      <div
        className="bg-zinc-800 text-white p-6 max-w mx-1 mt-1 rounded-lg shadow-lg relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://media.themoviedb.org/t/p/original${tv?.backdrop_path}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex flex-col items-center">
            <img
              src={`https://media.themoviedb.org/t/p/w300${tv?.poster_path}`}
              alt={tv?.title}
              className="rounded-lg shadow-md"
            />

            <p className="text-center mt-2 text-zinc-400">
              Disponível em: &nbsp;
              {
                provaider.results?.BR?.flatrate
                  ?.map((item: any, index: number) => (
                    <span className="text-white" key={index}>
                      {item.provider_name.split(' ')[0]}
                    </span>
                  ))
                  .filter(
                    (value: any, index: any, self: string | any[]) =>
                      self.indexOf(value) === index,
                  )[0]
              }
            </p>
          </div>
          <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
            <h2 className="text-3xl font-bold mb-2">
              {tv?.title || tv?.name || tv?.original_title || tv?.original_name}
            </h2>
            <p className="inline bg-gray-900 rounded-lg p-1">
              {tv?.first_air_date
                ? format(new Date(tv.first_air_date), 'dd MMM yyyy', {
                    locale: ptBR,
                  })
                : 'Data de Lançamento Indisponível'}
              {', '}
              {tv?.genres.map((genre) => `${genre.name} `)}
            </p>
            <div className="flex items-center my-4">
              <span className="bg-green-500 text-white text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-700 dark:text-green-200">
                {tv?.vote_average.toFixed(1)}% Geral dos Utilizadores
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
                onClick={() =>
                  !trailerKey.results[0]?.key
                    ? toast({
                        title: 'Trailer Indisponível',
                      })
                    : openVideoOverlay()
                }
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
                    {tv?.original_title}
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
                      Estado de Lançamento
                    </p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium text-center">
                      {tv?.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 text-center">
                      Temporadas
                    </p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium text-center">
                      {tv?.number_of_seasons}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 text-center">
                      Episódios
                    </p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium text-center">
                      {tv?.number_of_episodes}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 text-center">
                      Data de Lançamento
                    </p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium text-center">
                      {tv?.first_air_date
                        ? format(new Date(tv.first_air_date), 'dd MMM yyyy', {
                            locale: ptBR,
                          })
                        : ''}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <p className="mb-4">
              {tv?.tagline} {tv?.overview}
            </p>
            <div className="text-zinc-400">
              <p>
                <strong>Director:</strong>{' '}
                {principalCast[2]?.members.join(', ')}
              </p>
              <p>
                <strong>Screenplay, Story:</strong>{' '}
                {principalCast[0]?.members.join(', ')}{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
      <MainCast />
      <Recomendations idTv={id} />
    </>
  )
}
