/* eslint-disable @next/next/no-img-element */

import { Card } from '@/components/ui/card'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import { Pagination } from './pagination'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function ListAll({
  totalPages,
  page,
  selectedItem,
}: {
  totalPages: any
  page: number
  selectedItem: string
}) {
  return (
    <div className="col-span-3">
      {totalPages?.results?.map((result: any, index: number) => (
        <Link
          href={`/${selectedItem !== 'multi' ? selectedItem : result.media_type}/${result.id}`}
          key={index}
        >
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
                  {result.release_date
                    ? format(new Date(result.release_date), 'dd MMM yyyy', {
                        locale: ptBR,
                      })
                    : ''}
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
      <Pagination totalPages={page} />
    </div>
  )
}
