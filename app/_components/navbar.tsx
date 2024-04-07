"use client";

import { useState } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [showDropdown, setShowDropdown] = useState({ movies: false, series: false, artists: false });

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <button className="text-white bg-slate-600">Logo</button>
        <div onMouseEnter={() => setShowDropdown({ ...showDropdown, movies: true })} >
          Filmes
          {showDropdown.movies && (
            <div className="absolute mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20" onMouseLeave={() => setShowDropdown({ ...showDropdown, movies: false }) }>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Populares</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Em Exibição</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Brevemente</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Melhor Classificação</Link>
            </div>
          )}
        </div>
        <div onMouseEnter={() => setShowDropdown({ ...showDropdown, series: true })} >
          Séries
          {showDropdown.series && (
            <div className="absolute mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20" onMouseLeave={() => setShowDropdown({ ...showDropdown, series: false })}>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Populares</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Em Exibição</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Brevemente</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Melhor Classificação</Link>
            </div>
          )}
        </div>
        <div onMouseEnter={() => setShowDropdown({ ...showDropdown, artists: true })} >
          Artistas
          {showDropdown.artists && (
            <div className="absolute mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20" onMouseLeave={() => setShowDropdown({ ...showDropdown, artists: false })}>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Populares</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Em Exibição</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Brevemente</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Melhor Classificação</Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <input type="search" placeholder="Pesquisar" className="px-2 py-1 rounded"/>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Usuário
        </button>
      </div>
    </nav>
  );
}
