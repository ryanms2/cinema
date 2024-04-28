'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [showDropdown, setShowDropdown] = useState({
    movies: false,
    series: false,
    artists: false,
  })

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <button className="text-white bg-slate-600">Logo</button>
        <div
          onMouseEnter={() =>
            setShowDropdown({ ...showDropdown, movies: true })
          }
          onMouseLeave={() =>
            setShowDropdown({ ...showDropdown, movies: false })
          }
        >
          <button>Filmes</button>

          {showDropdown.movies && (
            <div className="absolute py-2 w-48 bg-white rounded-md shadow-xl z-20">
              <Link
                href="/movie"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Populares
              </Link>
              <Link
                href="/movie/now-playing"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Em Exibição
              </Link>
              <Link
                href="/movie/upcoming"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Brevemente
              </Link>
              <Link
                href="/movie/top-rated"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Melhor Classificação
              </Link>
            </div>
          )}
        </div>
        <div
          onMouseEnter={() =>
            setShowDropdown({ ...showDropdown, series: true })
          }
          onMouseLeave={() =>
            setShowDropdown({ ...showDropdown, series: false })
          }
        >
          <button>Séries</button>

          {showDropdown.series && (
            <div className="absolute py-2 w-48 bg-white rounded-md shadow-xl z-20">
              <Link
                href="/tv"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Populares
              </Link>
              <Link
                href="/tv/airing-today"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Emitidos hoje
              </Link>
              <Link
                href="/tv/top-rated"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Melhor Classificação
              </Link>
            </div>
          )}
        </div>
        <div
          onMouseEnter={() =>
            setShowDropdown({ ...showDropdown, artists: true })
          }
          onMouseLeave={() =>
            setShowDropdown({ ...showDropdown, artists: false })
          }
        >
          <button>Artistas</button>
          {showDropdown.artists && (
            <div className="absolute py-2 w-48 bg-white rounded-md shadow-xl z-20">
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Populares
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Em Exibição
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Brevemente
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Melhor Classificação
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <input
            type="search"
            placeholder="Pesquisar"
            className="px-2 py-1 rounded"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Usuário
        </button>
      </div>
    </nav>
  )
}
