/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import { fetchDetails, fetchMovieCredits } from '@/lib/dataPersonDetails'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface Person {
  profile_path: string
  place_of_birth: string
  name: string
  known_for_department: string
  gender: number
  birthday: string
  also_known_as: string[]
  biography: string
}

export function ComponentPage() {
  const params = useParams()
  const id = String(params.id)
  const [person, setPerson] = useState<Person | null>(null)
  const [movieCredits, setMovieCredits] = useState<any | null>(null)
  const [allMovieCredits, setAllMovieCredits] = useState<any | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const [details] = await Promise.all([fetchDetails(id || '')])

      setPerson(details)
    }

    if (params.id) {
      fetchData()
    }
  }, [id, params.id])
  useEffect(() => {
    const fetchData = async () => {
      const movieCreditsResponse = await fetchMovieCredits(id || '')
      const filteredCredits = movieCreditsResponse.cast.filter(
        (credit: any) => credit.order === 1,
      )
      setMovieCredits(filteredCredits)
    }
    if (id) {
      fetchData()
    }
  }, [id])

  useEffect(() => {
    const fetchData = async () => {
      const allMovieCreditsResponse = await fetchMovieCredits(id || '')

      setAllMovieCredits(allMovieCreditsResponse.cast)
    }
    if (id) {
      fetchData()
    }
  }, [id])
  console.log(movieCredits)
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden">
        <div className="md:w-1/3 p-4">
          <Image
            src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${person?.profile_path}`}
            alt={person?.name || 'Actor'}
            className="rounded-lg w-full"
            width={300}
            height={450}
          />
          <div className="mt-4 flex justify-between space-x-2">
            <a href="#" className="text-zinc-600 dark:text-zinc-300">
              <img
                aria-hidden="true"
                alt="facebook"
                src="https://img.icons8.com/?size=100&id=9foSA61V9037&format=png&color=000000"
                width={20}
                height={15}
              />
            </a>
            <a href="#" className="text-zinc-600 dark:text-zinc-300">
              <img
                aria-hidden="true"
                alt="X"
                src="https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=000000"
                width={20}
                height={15}
              />
            </a>
            <a href="#" className="text-zinc-600 dark:text-zinc-300">
              <img
                aria-hidden="true"
                alt="instagram"
                src="https://img.icons8.com/?size=100&id=wrwXlOVAFfeY&format=png&color=000000"
                width={20}
                height={15}
              />
            </a>
            <a href="#" className="text-zinc-600 dark:text-zinc-300">
              <img
                aria-hidden="true"
                alt="link para o site"
                src="https://img.icons8.com/?size=100&id=92&format=png&color=000000"
                width={20}
                height={15}
              />
            </a>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Informação Pessoal
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300">
              Reconhecido(a) por: {person?.known_for_department}
            </p>
            <p className="text-zinc-600 dark:text-zinc-300">
              Sexo:{' '}
              {person?.gender === 0
                ? 'Não especificado'
                : person?.gender === 1
                  ? 'Feminino'
                  : person?.gender === 2
                    ? 'Masculino'
                    : 'Não binário'}
            </p>
            <p className="text-zinc-600 dark:text-zinc-300">
              Nasceu em:{' '}
              {person?.birthday
                ? format(new Date(person.birthday), 'dd MMM yyyy', {
                    locale: ptBR,
                  }) +
                  ` (${new Date().getFullYear() - new Date(person.birthday).getFullYear()} anos)`
                : ''}
            </p>
            <p className="text-zinc-600 dark:text-zinc-300">
              Local de nascimento: {person?.place_of_birth}
            </p>
            <p className="text-zinc-600 dark:text-zinc-300">
              Nome por qual também é conhecido(a):{' '}
              {person?.also_known_as.join(', ')}
            </p>
          </div>
        </div>
        <div className="md:w-2/3 p-4">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            {person?.name}
          </h1>
          {person?.biography && (
            <>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-4">
                Biografia
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300">
                {person?.biography}
              </p>
            </>
          )}
          {/* <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-4">
            Reconhecido(a) por
          </h2>
          <div className="flex space-x-4 overflow-x-auto py-2">
            <Image
              src="https://media.themoviedb.org/t/p/w150_and_h225_bestv2/2nM2NRV8wt3n3ffoHQ3KdMkY3vR.jpg"
              alt="Carros"
              className="rounded-lg"
              width={150}
              height={225}
            />
          </div> */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-4">
            Atuação
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
              <thead className="bg-zinc-50 dark:bg-zinc-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    Ano
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                    Papel
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
                {allMovieCredits
                  ?.sort((a: any, b: any) => {
                    const dateA = a.release_date || a.first_air_date || ''
                    const dateB = b.release_date || b.first_air_date || ''
                    if (!dateA) return -1
                    if (!dateB) return 1
                    return dateB.localeCompare(dateA)
                  })
                  .map((credit: any) => (
                    <tr key={credit.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                        {credit.release_date
                          ? new Date(credit.release_date).getFullYear()
                          : credit.first_air_date
                            ? new Date(credit.first_air_date).getFullYear()
                            : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                        {credit.title || credit.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                        {credit.episode_count &&
                          `${credit.episode_count} episódios`}
                        {`como ${credit.character}`}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
