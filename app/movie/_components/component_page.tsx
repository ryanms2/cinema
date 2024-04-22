
/* eslint-disable @next/next/no-img-element */
"use client"
import { Badge } from "@/components/ui/badge";
import {  fetchPopularMovies } from "@/lib/data";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ListFilms } from "./list-films";

export default function ComponentPage() {
    const [searchMovie, setSearchMovie] = useState<string | null>(null)
    const [inputSearch, setInputSearch] = useState<string | null>(null)
    
    const [movies, setMovies] = useState<any>();

    /*useEffect(() => {
        const fetchMovies = async () => {
            if (searchMovie) {
                const fetchedMovies = await fetchPopularMovies(searchMovie);
                setMovies(fetchedMovies);
            }
        };
        fetchMovies();
    }, [searchMovie]); */

    const handleSearch = () => {
        
        setSearchMovie(inputSearch);
        
    };
    
return (
    <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-4">
            
            <div className="order-1 md:order-1 md:sticky top-4 bg-white p-4 rounded-lg  max-w-full md:max-w-xs border-0">
                <div className="max-w-2xl h-50px mx-auto my-6">
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
                        <Input placeholder="Filme..." onChange={(e) => (setInputSearch(`query=${e.target.value}?`))} />
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
                    <Button className="w-full" onClick={handleSearch}>Pesquisar</Button>
                </div>
            </div>
            <div className="order-2 md:order-2 flex-1">
                <ListFilms inputSearch={searchMovie}/>
            </div>
        </div>
        
        </div>
        
    </div>
    
    )
}