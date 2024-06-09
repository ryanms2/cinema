/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  fetchAll,
  fetchAllResult,
  fetchCollectionsAmount,
  fetchMovieAmount,
  fetchPersonAmount,
  fetchSeriesAmount,
} from '@/lib/data'
import { Button } from '@/components/ui/button'
import Search from './search'
import { useEffect, useState } from 'react'
import Pagination from './pagination'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ComponentPage({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
    category?: string
  }
}) {
  const [selectedItem, setSelectedItem] = useState<string | null>(
    searchParams?.category || 'multi',
  )
  const [totalPages, setTotalPages] = useState<any>()
  const [amountMovies, setAmountMovies] = useState<number>(0)
  const [amountSeries, setAmountSeries] = useState<number>(0)
  const [amountCollections, setAmountCollections] = useState<number>(0)
  const [amountPerson, setAmountPerson] = useState<number>(0)
  const [page, setPage] = useState<number>(1)

  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  const searchParamss = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const handleCategory = (category: string | null) => {
    if (category !== 'multi') {
      const params = new URLSearchParams(searchParamss)
      params.set('page', '1')
      if (category) {
        params.set('category', category)
      } else {
        params.delete('category')
      }
      replace(`${pathname}?${params.toString()}`)
      setSelectedItem(category)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      let total = await fetchAll(query)

      if (selectedItem) {
        total = await fetchAllResult(currentPage, selectedItem, query)
      }

      const movies = await fetchMovieAmount(query)
      const series = await fetchSeriesAmount(query)
      const collections = await fetchCollectionsAmount(query)
      const persons = await fetchPersonAmount(query)
      setPage(total.total_pages)
      setTotalPages(total)
      setAmountMovies(movies)
      setAmountSeries(series)
      setAmountCollections(collections)
      setAmountPerson(persons)
    }
    fetchData()
  }, [query, selectedItem, currentPage])

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-4 mb-8">
          <Search placeholder="Search for movies, series, actors..." />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="sticky top-4 bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold text-lg mb-4">Resultados da Busca</h2>
              <ul className="space-y-2">
                <li>
                  <Button
                    className={`justify-between w-full text-left ${selectedItem === 'tv' ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => handleCategory('tv')}
                  >
                    <span>Séries</span>
                    <Badge>{amountSeries}</Badge>
                  </Button>
                </li>
                <li>
                  <Button
                    className={`justify-between w-full text-left ${selectedItem === 'movie' ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => handleCategory('movie')}
                  >
                    <span>Filmes</span>
                    <Badge>{amountMovies}</Badge>
                  </Button>
                </li>
                <li>
                  <Button
                    className={`justify-between w-full text-left ${selectedItem === 'collection' ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => handleCategory('collection')}
                  >
                    <span>Coleções</span>
                    <Badge>{amountCollections}</Badge>
                  </Button>
                </li>
                <li>
                  <Button
                    className={`justify-between w-full text-left ${selectedItem === 'person' ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => handleCategory('person')}
                  >
                    <span>Pessoas</span>
                    <Badge>{amountPerson}</Badge>
                  </Button>
                </li>
              </ul>
              <p className="text-sm mt-4">
                Dica: Use o parâmetro &apos;y:&apos; para filtrar seus
                resultados por ano. Exemplo: &apos;star wars y:1977&apos;.
              </p>
            </div>
          </div>
          <div className="col-span-3">
            {totalPages?.results?.map((result: any, index: number) => (
              <Link href={`/movie/${result.id}`} key={index}>
                <Card className="mb-4 cursor-pointer">
                  <div className="flex gap-4">
                    <div className="relative">
                      <img
                        alt={
                          result.title ||
                          result.original_title ||
                          result.name ||
                          result.original_name
                        }
                        className="w-300 h-48 object-cover rounded"
                        height="192"
                        src={`https://image.tmdb.org/t/p/w200${result.poster_path || result.profile_path}`}
                        style={{
                          aspectRatio: '90/120',
                          objectFit: 'cover',
                        }}
                        width="300"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold hover:text-gray-800 transition-colors duration-300">
                        {result.title ||
                          result.original_title ||
                          result.name ||
                          result.original_name}
                      </h3>
                      <p className="text-gray-700">
                        {result.overview || result.known_for_department
                          ? result.overview
                            ? result.overview.substring(0, 220) + '...'
                            : ''
                          : ''}
                      </p>
                      <p className="text-sm text-gray-500">
                        {result.release_date}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
            <Pagination totalPages={page} />
          </div>
        </div>
      </div>
    </div>
  )
}
