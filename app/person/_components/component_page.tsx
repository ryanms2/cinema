/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Card } from '@/components/ui/card'
import { fetchPopularPerson } from '@/lib/data'
import { useEffect, useState } from 'react'
import Pagination from './pagination'

export function ComponentPage({
  searchParams,
}: {
  searchParams?: {
    page?: string
  }
}) {
  const [totalPages, setTotalPages] = useState<any>()
  const currentPage = Number(searchParams?.page) || 1
  let totalPage = 6
  if (currentPage >= totalPage) {
    totalPage = currentPage + 2
  }

  useEffect(() => {
    const fetchData = async () => {
      const total = await fetchPopularPerson(currentPage)
      setTotalPages(total)
    }
    fetchData()
  }, [currentPage])
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {totalPages?.results?.map((result: any, index: number) => (
              <Card key={index} className="mb-4">
                <div className="flex gap-4">
                  <img
                    alt={
                      result.title ||
                      result.original_title ||
                      result.name ||
                      result.original_name
                    }
                    className="w-24 h-32 object-cover rounded"
                    height="120"
                    src={`https://image.tmdb.org/t/p/w500${result.poster_path || result.profile_path}`}
                    style={{
                      aspectRatio: '90/120',
                      objectFit: 'cover',
                    }}
                    width="90"
                  />
                  <div>
                    <h3 className="text-xl font-bold">
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
            ))}
          </div>
        </div>
        <div className="text-center">
          <Pagination totalPages={totalPage} />
        </div>
      </div>
    </div>
  )
}
