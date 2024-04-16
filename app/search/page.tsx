/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { fetchAll, fetchCollectionsAmount, fetchMovieAmount, fetchPersonAmount, fetchSeriesAmount } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Search from "./_components/search";

export default async function Page({searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    }
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchAll("godzila");
    const amountMovies = await fetchMovieAmount("godzilla");
    const amountSeries = await fetchSeriesAmount("godzilla");
    const amountCollections = await fetchCollectionsAmount("godzilla");
    const amountPerson = await fetchPersonAmount("godzilla");
    
return (
    <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-4 mb-8">
            <Search placeholder="Search for movies, series, actors..." />
        </div>
        <div className="grid grid-cols-4 gap-4">
            <div>
            <div className="sticky top-4 bg-white p-4 rounded-lg shadow">
                <h2 className="font-bold text-lg mb-4">Search Results</h2>
                <ul className="space-y-2">
                <li>
                    <Button className="justify-between w-full text-left">
                    <span>Series</span>
                    <Badge>{amountSeries}</Badge>
                    </Button>
                </li>
                <li>
                    <Button className="justify-between w-full text-left">
                    <span>Movies</span>
                    <Badge>{amountMovies}</Badge>
                    </Button>
                </li>
                <li>
                    <Button className="justify-between w-full text-left">
                    <span>Collections</span>
                    <Badge>{amountCollections}</Badge>
                    </Button>
                </li>
                <li>
                    <Button className="justify-between w-full text-left">
                    <span>People</span>
                    <Badge>{amountPerson}</Badge>
                    </Button>
                </li>
                </ul>
                <p className="text-sm mt-4">
                Dica: Use o parâmetro &apos;y:&apos; para filtrar seus resultados por ano. Exemplo: &apos;star wars y:1977&apos;.
                </p>
            </div>
            </div>
            <div className="col-span-3">
                {totalPages?.results?.map((result: any, index: number) => (
                  <Card key={index} className="mb-4">
                <div className="flex gap-4">
                <img
                    alt={result.title}
                    className="w-24 h-32 object-cover rounded"
                    height="120"
                    src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                    style={{
                    aspectRatio: "90/120",
                    objectFit: "cover",
                    }}
                    width="90"
                />
                <div>
                    <h3 className="text-xl font-bold">{result.title}</h3>
                    <p className="text-gray-700">
                    {result.overview.substring(0, 220) + '...'}
                    </p>
                    <p className="text-sm text-gray-500">{result.release_date}</p>
                </div>
                </div>
            </Card>  
                ))}
            
            </div>
        </div>
        </div>
    </div>
    )
}