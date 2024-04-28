/* eslint-disable @next/next/no-img-element */
'use client'
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { ListFilms } from './list-films'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { CalendarIcon } from '@radix-ui/react-icons'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover'
import { format } from 'date-fns'
import * as React from 'react'

export default function ComponentPage() {
  const [primaryDateLast, setPrimaryDateLast] = useState<string>('')
  const [primaryDateFirst, setPrimaryDateFirst] = useState<string>('')
  const [dateCalendarLast, setDateCalendarLast] = React.useState<Date>()
  const [dateCalendarFirst, setDateCalendarFirst] = React.useState<Date>()
  const [selectedGenres, setSelectedGenres] = useState<number[] | null>([])
  const [genres, setGenres] = useState<number[] | null>([])
  const [rangeValue, setRangeValue] = useState<number | undefined>(undefined)
  const [inputRange, setinputRange] = useState<number | undefined>(undefined)
  const [selectedOrder, setSelectedOrder] = useState<string>('popularity.desc')
  const [inputOrder, setInputOrder] = useState<string>('popularity.desc')
  const [change, setChange] = useState(0)
  const [changeGenres, setChangeGenres] = useState(0)

  const handleOrderChange = (value: string) => {
    setSelectedOrder(value)
    setChange((prev) => prev + 1)
  }

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(Number(event.target.value))
    setChange((prev) => prev + 1)
  }

  const handleBadgeClick = (genre: number) => {
    if (selectedGenres?.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
    } else {
      setSelectedGenres(selectedGenres ? [...selectedGenres, genre] : [genre])
      setChange((prev) => prev + 1)
    }
  }

  const handleSearch = () => {
    // Formata a data para "yyyy-MM-dd" antes de usar
    const formattedDateLast = dateCalendarLast
      ? format(dateCalendarLast, 'yyyy-MM-dd')
      : ''
    const dateQueryParamLast = `&primary_release_date.lte=${formattedDateLast}`
    const formattedDateFirst = dateCalendarFirst
      ? format(dateCalendarFirst, 'yyyy-MM-dd')
      : ''
    const dateQueryParamFirst = `&primary_release_date.gte=${formattedDateFirst}`
    setPrimaryDateFirst(dateQueryParamFirst)
    setPrimaryDateLast(dateQueryParamLast)
    setGenres(selectedGenres)
    setinputRange(rangeValue)
    setInputOrder(selectedOrder)
    setChangeGenres(change)
    // Agora, você pode usar `primaryDateLast` que está no formato desejado
    // Por exemplo, passando para o componente ListFilms ou para uma API
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="font-extrabold text-2xl">Filmes populares</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="order-1 md:order-1 md:sticky top-4 bg-white p-4 rounded-lg  max-w-full md:max-w-xs border-0">
            <div className="max-w-2xl h-50px mx-auto my-6">
              <Select onValueChange={handleOrderChange}>
                <SelectTrigger id="ordering">
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vote_average.desc">
                    Média de Votos
                  </SelectItem>
                  <SelectItem value="popularity.desc">Popularidade</SelectItem>
                  <SelectItem value="primary_release_date.desc">
                    Data de lançamento
                  </SelectItem>
                </SelectContent>
              </Select>
              {/* <details className="my-6">
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
                    </details> */}
              <details className="my-6">
                <summary className="mb-2 font-bold cursor-pointer">
                  Filtros
                </summary>
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
                              variant={'outline'}
                              className={cn(
                                'w-[280px] justify-start text-left font-normal',
                                !dateCalendarFirst && 'text-muted-foreground',
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateCalendarFirst ? (
                                format(dateCalendarFirst, 'PPP')
                              ) : (
                                <span>De</span>
                              )}
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
                              variant={'outline'}
                              className={cn(
                                'w-[280px] justify-start text-left font-normal',
                                !dateCalendarLast && 'text-muted-foreground',
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateCalendarLast ? (
                                format(dateCalendarLast, 'PPP')
                              ) : (
                                <span>Até</span>
                              )}
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
                      <Button
                        className={`${selectedGenres?.includes(28) ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handleBadgeClick(28)}
                      >
                        Ação
                      </Button>
                      <Button
                        className={`${selectedGenres?.includes(12) ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handleBadgeClick(12)}
                      >
                        Aventura
                      </Button>
                      <Button
                        className={`${selectedGenres?.includes(35) ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handleBadgeClick(35)}
                      >
                        Comédia
                      </Button>
                      <Button
                        className={`${selectedGenres?.includes(18) ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handleBadgeClick(18)}
                      >
                        Drama
                      </Button>
                      <Button
                        className={`${selectedGenres?.includes(14) ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handleBadgeClick(14)}
                      >
                        Fantasia
                      </Button>
                      <Button
                        className={`${selectedGenres?.includes(878) ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handleBadgeClick(878)}
                      >
                        Ficção Científica
                      </Button>
                      <Button
                        className={`${selectedGenres?.includes(10749) ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handleBadgeClick(10749)}
                      >
                        Romance
                      </Button>
                      <Button
                        className={`${selectedGenres?.includes(27) ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handleBadgeClick(27)}
                      >
                        Terror
                      </Button>
                    </div>
                  </div>
                  {/* <div>
                        <h4 className="mb-2 font-semibold">Classificação Etária:</h4>
                        <div className="flex flex-wrap gap-2">
                            <Button className={`${selectedCertification?.includes('l') ? 'bg-blue-500 text-white' : ''}`}>L</Button>
                            <Button>10</Button>
                            <Button>12</Button>
                            <Button>14</Button>
                            <Button >16</Button>
                            <Button>18</Button>
                        </div>
                        </div> */}

                  {/* <div>
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
                        </div> */}
                  <div>
                    <h4 className="mb-2 font-semibold">
                      Avaliação dos Usuários:
                    </h4>
                    <div className="flex items-center gap-4">
                      <Input
                        className="flex-1"
                        type="range"
                        min="1"
                        max="10"
                        value={rangeValue}
                        onChange={handleRangeChange}
                      />
                      <span className="ml-4 text-sm">
                        {!rangeValue ? 1 : rangeValue}/10
                      </span>
                    </div>
                  </div>
                </div>
              </details>
              <Button className="w-full" onClick={handleSearch}>
                Pesquisar
              </Button>
            </div>
          </div>
          <div className="order-2 md:order-2 flex-1">
            <ListFilms
              inputDateLast={primaryDateLast}
              inputPrimaryDateFirst={primaryDateFirst}
              selectGenres={genres}
              inputRange={inputRange}
              inputOrder={inputOrder}
              changeGenre={changeGenres}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
