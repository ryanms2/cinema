/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import { fetchMainCast } from '@/lib/dataTvDetails'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface MainCast {
  cast: any[]
  profile_path: string
  name?: string
  original_name?: string
  character: string
}

export function MainCast() {
  const [cast, setCast] = useState<MainCast | null>(null)
  const params = useParams()
  const id = String(params.id)
  useEffect(() => {
    const fetchData = async () => {
      const total = await fetchMainCast(id || '')
      setCast(total)
    }
    fetchData()
  }, [params.id, id])
  return (
    <div className="bg-white dark:bg-zinc-800 p-4">
      <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
        Elenco Principal
      </h2>
      <div className="flex overflow-x-auto gap-4">
        {cast?.cast.map((actor: any) => (
          <div
            className="flex-none w-48 bg-zinc-100 dark:bg-zinc-700 rounded-lg p-2"
            key={actor.cast_id}
          >
            <img
              className="w-250 object-cover rounded-lg"
              src={`https://media.themoviedb.org/t/p/w300${actor?.profile_path}`}
              alt={actor.original_name}
            />
            <div className="mt-2 text-center">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                {actor.original_name}
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                {actor.character}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
