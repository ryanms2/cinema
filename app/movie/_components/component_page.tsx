
/* eslint-disable @next/next/no-img-element */
"use client"
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { fetchAll, fetchAllResult, fetchCollectionsAmount, fetchMovieAmount, fetchPersonAmount, fetchSeriesAmount } from "@/lib/data";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";

export default function ComponentPage({searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
        category?: string;
    }
}) {

    const [selectedItem, setSelectedItem] = useState<string | null>(searchParams?.category || "multi")
    const [totalPages, setTotalPages] = useState<any>()
    const [amountMovies, setAmountMovies] = useState<number>(0)
    const [amountSeries, setAmountSeries] = useState<number>(0)
    const [amountCollections, setAmountCollections] = useState<number>(0)
    const [amountPerson, setAmountPerson] = useState<number>(0)
    const [page, setPage] = useState<number>(1)

    const query = searchParams?.query || '';
    let currentPage = Number(searchParams?.page) || 1;

    const searchParamss = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleCategory = (category: string | null) => {
        if(category !== "multi") {
          const params = new URLSearchParams(searchParamss);
          params.set('page', '1');
          if (category) {
            params.set('category', category);
          } else {
            params.delete('category');
          }
          replace(`${pathname}?${params.toString()}`);  
          setSelectedItem(category)
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            let total = await fetchAll(query); 
            
            if(selectedItem) {
                total = await fetchAllResult(currentPage, selectedItem, query);   
            }
            
            const movies = await fetchMovieAmount(query);
            const series = await fetchSeriesAmount(query);
            const collections = await fetchCollectionsAmount(query);
            const persons = await fetchPersonAmount(query);
            setPage(total.total_pages)
            setTotalPages(total);
            setAmountMovies(movies);
            setAmountSeries(series);
            setAmountCollections(collections);
            setAmountPerson(persons);
        };
        fetchData();
    }, [query, selectedItem, currentPage]);
    
    
return (
    <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-4 gap-4">
            <div>
            <div className="sticky top-4 bg-white p-4 rounded-lg shadow">
                <div className="max-w-2xl mx-auto my-6">
                    <Select>
                    <SelectTrigger id="ordering">
                        <SelectValue placeholder="Ordenar" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="alphabetical">Alfabética</SelectItem>
                        <SelectItem value="popularity">Popularidade</SelectItem>
                        <SelectItem value="release-date">Data de lançamento</SelectItem>
                    </SelectContent>
                    </Select>
                    <details className="my-6">
                    <summary className="mb-2 font-bold cursor-pointer">Onde Ver</summary>
                    <ScrollArea className="border rounded-md h-32">
                        <div className="grid grid-cols-3 gap-4 p-4">
                        <img
                            alt="Streaming Service Logo"
                            height="40"
                            src="/placeholder.svg"
                            style={{
                            aspectRatio: "40/40",
                            objectFit: "cover",
                            }}
                            width="40"
                        />
                        </div>
                    </ScrollArea>
                    </details>
                    <details className="my-6">
                    <summary className="mb-2 font-bold cursor-pointer">Filtros</summary>
                    <div className="grid gap-6">
                        <div>
                        <h4 className="mb-2 font-semibold">Título:</h4>
                        <Input placeholder="Filme ou série" />
                        </div>
                        <div className="grid gap-4">
                        <h4 className="mb-2 font-semibold">Ano de Lançamento:</h4>
                        <div className="flex gap-4">
                            <Input className="flex-1" placeholder="De" />
                            <Input className="flex-1" placeholder="Até" />
                        </div>
                        </div>
                        <div>
                        <h4 className="mb-2 font-semibold">Gêneros:</h4>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">Ação</Badge>
                            <Badge variant="secondary">Aventura</Badge>
                            <Badge variant="secondary">Comédia</Badge>
                            <Badge variant="secondary">Drama</Badge>
                            <Badge variant="secondary">Fantasia</Badge>
                            <Badge variant="secondary">Ficção Científica</Badge>
                            <Badge variant="secondary">Romance</Badge>
                            <Badge variant="secondary">Terror</Badge>
                        </div>
                        </div>
                        <div>
                        <h4 className="mb-2 font-semibold">Classificação Etária:</h4>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">L</Badge>
                            <Badge variant="secondary">10</Badge>
                            <Badge variant="secondary">12</Badge>
                            <Badge variant="secondary">14</Badge>
                            <Badge variant="secondary">16</Badge>
                            <Badge variant="secondary">18</Badge>
                        </div>
                        </div>
                        <div>
                        <h4 className="mb-2 font-semibold">Duração:</h4>
                        <Select>
                            <SelectTrigger id="duration">
                            <SelectValue placeholder="Selecione uma opção" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="short">Curta (até 1h30min)</SelectItem>
                            <SelectItem value="medium">Média (1h30min a 2h30min)</SelectItem>
                            <SelectItem value="long">Longa (mais de 2h30min)</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <div>
                        <h4 className="mb-2 font-semibold">Avaliação dos Usuários:</h4>
                        <div className="flex items-center gap-4">
                            <Input className="flex-1" type="range" />
                            <span className="ml-4 text-sm">4/5</span>
                        </div>
                        </div>
                    </div>
                    </details>
                    <Button className="w-full">Pesquisar</Button>
                </div>
            </div>
            </div>
            <div className="col-span-3">
                {totalPages?.results?.map((result: any, index: number) => (
                  <Card key={index} className="mb-4">
                <div className="flex gap-4">
                <img
                    alt={result.title || result.original_title || result.name || result.original_name}
                    className="w-24 h-32 object-cover rounded"
                    height="120"
                    src={`https://image.tmdb.org/t/p/w500${result.poster_path || result.profile_path}`}
                    style={{
                    aspectRatio: "90/120",
                    objectFit: "cover",
                    }}
                    width="90"
                />
                <div>
                    <h3 className="text-xl font-bold">{result.title || result.original_title || result.name || result.original_name }</h3>
                    <p className="text-gray-700">
                    {result.overview || result.known_for_department ? (result.overview ? result.overview.substring(0, 220) + '...' : '') : ''}
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