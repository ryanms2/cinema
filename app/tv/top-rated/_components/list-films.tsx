/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { fetchTvTopRatedFilter } from '@/lib/data'
import { useEffect, useState } from 'react'

export function ListFilms({
  inputDateLast,
  inputPrimaryDateFirst,
  selectGenres,
  inputRange,
  inputOrder,
  changeGenre,
}: {
  inputDateLast: string | null
  inputPrimaryDateFirst: string | null
  selectGenres: number[] | null
  inputRange: number | undefined
  inputOrder: string
  changeGenre: number
}) {
  const [popularMovies, setPopularMovies] = useState<any>()
  const [inputPage, setInputPage] = useState<number>(1)

  useEffect(() => {
    setInputPage(1)
  }, [changeGenre])
  useEffect(() => {
    const genres = selectGenres ? '&with_genres=' + selectGenres.toString() : ''
    const dateLast = inputDateLast ? '&air_date.lte=' + inputDateLast : ''
    const dateFirst = inputPrimaryDateFirst
      ? '&air_date.gte=' + inputPrimaryDateFirst
      : ''
    const inputRangeValue =
      inputRange === undefined ? '' : `&vote_average.gte=${inputRange}`
    if (inputPage !== 1) {
      const fetchData = async () => {
        const newMovies = await fetchTvTopRatedFilter(
          dateFirst,
          dateLast,
          genres,
          inputRangeValue,
          inputOrder,
          inputPage,
        )
        setPopularMovies((prevMovies: any) => ({
          results: [...prevMovies.results, ...newMovies.results],
        }))
      }
      fetchData()
    } else {
      const fetchData = async () => {
        const total = await fetchTvTopRatedFilter(
          dateFirst,
          dateLast,
          genres,
          inputRangeValue,
          inputOrder,
          inputPage,
        )

        setPopularMovies(total)
      }
      fetchData()
    }
  }, [
    inputDateLast,
    inputPrimaryDateFirst,
    selectGenres,
    inputRange,
    inputOrder,
    inputPage,
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {popularMovies?.results?.map((result: any, index: number) => (
          <div className="group relative" key={index}>
            <img
              alt={
                result.title ||
                result.original_title ||
                result.name ||
                result.original_name
              }
              className="w-full h-auto rounded-lg shadow-lg"
              height="300"
              src={`https://image.tmdb.org/t/p/w300${result.poster_path || result.profile_path}`}
              style={{
                aspectRatio: '200/300',
                objectFit: 'cover',
              }}
              width="200"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent rounded-b-lg">
              <Badge className="absolute top-4 right-4">75%</Badge>
              <h3 className="text-white font-semibold">
                {result.title ||
                  result.original_title ||
                  result.name ||
                  result.original_name}
              </h3>
              <span className="text-white text-sm">
                {result.release_date || result.first_air_date}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Button variant="secondary" onClick={() => setInputPage(inputPage + 1)}>
          Ver Mais
        </Button>
      </div>
    </div>
  )
}
