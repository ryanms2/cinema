/* eslint-disable @next/next/no-img-element */
"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { fetchPopularMovies } from "@/lib/data";
import { useEffect, useState } from "react";

export function ListFilms({inputSearch}: {inputSearch: string | null}) {
  const [popularMovies, setPopularMovies] = useState<any>()
  
  useEffect(() => {
    if (inputSearch === null) {
      const fetchData = async () => {
        let total = await fetchPopularMovies(); 
        setPopularMovies(total);
      };
      fetchData();
    } else {
      const fetchData = async () => {
        let total = await fetchPopularMovies(inputSearch); 
        setPopularMovies(total);
      };
      fetchData();
    }
}, [inputSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {popularMovies?.results?.map((result: any, index: number) => (
          <div className="group relative" key={index}>
            <img
              alt={result.title || result.original_title || result.name || result.original_name}
              className="w-full h-auto rounded-lg shadow-lg"
              height="300"
              src={`https://image.tmdb.org/t/p/w300${result.poster_path || result.profile_path}`}
              style={{
                aspectRatio: "200/300",
                objectFit: "cover",
              }}
              width="200"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent rounded-b-lg">
              <Badge className="absolute top-4 right-4">75%</Badge>
              <h3 className="text-white font-semibold">{result.title || result.original_title || result.name || result.original_name }</h3>
              <span className="text-white text-sm">{result.release_date}</span>
            </div>
          </div>   
                ))}
        
      </div>
      <div className="text-center mt-6">
        <Button variant="secondary">Ver Mais</Button>
      </div>
    </div>
  )
}