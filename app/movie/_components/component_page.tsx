
/* eslint-disable @next/next/no-img-element */
"use client"
import { Badge } from "@/components/ui/badge";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ListFilms } from "./list-films";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";
import * as React from "react";

export default function ComponentPage() {
    const [primaryDateLast, setPrimaryDateLast] = useState<string>('')
    const [primaryDateFirst, setPrimaryDateFirst] = useState<string>('')
    const [dateCalendarLast, setDateCalendarLast] = React.useState<Date>()
    const [dateCalendarFirst, setDateCalendarFirst] = React.useState<Date>()
    // Define the initial state
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    console.log(selectedGenre)
    const handleBadgeClick = (genre: string) => {
        setSelectedGenre(genre);
    };

    const handleSearch = () => {
            // Formata a data para "yyyy-MM-dd" antes de usar
            const formattedDateLast = dateCalendarLast ? format(dateCalendarLast, "yyyy-MM-dd") : '';
            const dateQueryParamLast = `&primary_release_date.lte=${formattedDateLast}`;
            const formattedDateFirst = dateCalendarFirst ? format(dateCalendarFirst, "yyyy-MM-dd") : '';
            const dateQueryParamFirst = `&primary_release_date.gte=${formattedDateFirst}`;
            console.log(dateQueryParamFirst, dateQueryParamLast)
            setPrimaryDateFirst(dateQueryParamFirst);
            setPrimaryDateLast(dateQueryParamLast)
            
            // Agora, você pode usar `primaryDateLast` que está no formato desejado
            // Por exemplo, passando para o componente ListFilms ou para uma API
        
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
                        {/* <div>
                        <h4 className="mb-2 font-semibold">Título:</h4>
                        <Input placeholder="Filme..." onChange={(e) => (setInputSearch(`query=${e.target.value}`))} />
                        </div> */}
                        <div className="grid gap-4">
                        <h4 className="mb-2 font-semibold">Ano de Lançamento:</h4>
                        <div className="flex gap-4 flex-wrap">
                            <div>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !dateCalendarFirst && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dateCalendarFirst ? format(dateCalendarFirst, "PPP") : <span>De</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white rounded">
                                    <Calendar
                                    mode="single"
                                    selected={dateCalendarFirst}
                                    onSelect={setDateCalendarFirst}
                                    initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            </div>
                        
                            <div>
                                <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !dateCalendarLast && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dateCalendarLast ? format(dateCalendarLast, "PPP") : <span>Até</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white rounded">
                                    <Calendar
                                    mode="single"
                                    selected={dateCalendarLast}
                                    onSelect={setDateCalendarLast}
                                    initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            </div>
                        </div>
                        </div>
                        <div>
                        <h4 className="mb-2 font-semibold">Gêneros:</h4>
                        <div className="flex flex-wrap gap-2">
                            <Button className={`${selectedGenre === 'Ação' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleBadgeClick('Ação')}>Ação</Button>
                            <Button className={`${selectedGenre === 'Aventura' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleBadgeClick('Aventura')}>Aventura</Button>
                            <Button className={`${selectedGenre === 'Comédia' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleBadgeClick('Comédia')}>Comédia</Button>
                            <Button className={`${selectedGenre === 'Drama' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleBadgeClick('Drama')}>Drama</Button>
                            <Button className={`${selectedGenre === 'Fantasia' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleBadgeClick('Fantasia')}>Fantasia</Button>
                            <Button className={`${selectedGenre === 'Ficção Científica' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleBadgeClick('Ficção Científica')}>Ficção Científica</Button>
                            <Button className={`${selectedGenre === 'Romance' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleBadgeClick('Romance')}>Romance</Button>
                            <Button className={`${selectedGenre === 'Terror' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleBadgeClick('Terror')}>Terror</Button>
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
                <ListFilms inputDateLast={primaryDateLast} inputPrimaryDateFirst={primaryDateFirst}/>
            </div>
        </div>
        
        </div>
        
    </div>
    
    )
}