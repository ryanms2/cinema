'use server'
import axios from 'axios'
import { unstable_noStore as noStore } from 'next/cache'

export async function fetchAll(query: string) {
  noStore()
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TOKEN}&query=${query}&include_adult=false&language=pt-br`
  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }
  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchAllResult(
  page: number,
  item: string,
  query: string,
) {
  noStore()
  const url = `https://api.themoviedb.org/3/search/${item}?api_key=${process.env.NEXT_PUBLIC_TOKEN}&query=${query}&include_adult=false&language=pt-br&page=${page}`
  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }
  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchMovieAmount(query: string) {
  noStore()
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=pt-br`

  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data.total_results
  } catch (error) {
    console.error(error)
  }
}

export async function fetchSeriesAmount(query: string) {
  noStore()
  const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=pt-br`

  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data.total_results
  } catch (error) {
    console.error(error)
  }
}

export async function fetchCollectionsAmount(query: string) {
  noStore()
  const url = `https://api.themoviedb.org/3/search/collection?query=${query}&include_adult=false&language=pt-br`

  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data.total_results
  } catch (error) {
    console.error(error)
  }
}

export async function fetchPersonAmount(query: string) {
  noStore()
  const url = `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=pt-br`

  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data.total_results
  } catch (error) {
    console.error(error)
  }
}

export async function fetchTrendingMovies(tipo: string) {
  noStore()
  let url
  if (tipo === 'day') {
    url = 'https://api.themoviedb.org/3/trending/movie/day?language=pt-br'
  }

  if (tipo === 'week') {
    url = 'https://api.themoviedb.org/3/trending/movie/week?language=pt-br'
  }

  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchNowPlayingMovies(tipo: string) {
  noStore()
  let url
  if (tipo === 'cinema') {
    url = 'https://api.themoviedb.org/3/movie/upcoming?language=pt-br&page=1'
  }

  if (tipo === 'streaming') {
    url = 'https://api.themoviedb.org/3/movie/popular?language=pt-br&page=1'
  }

  if (tipo === 'naTv') {
    url = 'https://api.themoviedb.org/3/movie/now_playing?language=pt-br&page=1'
  }

  if (tipo === 'alugar') {
    url = 'https://api.themoviedb.org/3/movie/top_rated?language=pt-br&page=1'
  }

  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchPopularMovies(query?: string | null) {
  noStore()
  let url = `https://api.themoviedb.org/3/movie/popular?${query}language=pt-br&page=1`
  if (!query) {
    url = `https://api.themoviedb.org/3/movie/popular?language=pt-br&page=1`
  }
  console.log(url)

  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }

  try {
    const response = await axios.request(options)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchMoviesFilter(
  primaryFirstDate?: string,
  primaryLastDate?: string | null,
  genres?: string,
  rangeVote?: string,
  inputOrder?: string,
  page?: number,
) {
  noStore()
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-br&page=${page}${primaryFirstDate}${primaryLastDate}&sort_by=${inputOrder}${genres}${rangeVote}`
  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }
  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchMoviesNowPlayingFilter(
  primaryFirstDate?: string,
  primaryLastDate?: string | null,
  genres?: string,
  rangeVote?: string,
  inputOrder?: string,
  page?: number,
) {
  noStore()
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-br&page=${page}&sort_by=${inputOrder}&with_release_type=2|3${primaryFirstDate}${primaryLastDate}${genres}${rangeVote}`
  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }
  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchMoviesUpcomingFilter(
  primaryFirstDate?: string,
  primaryLastDate?: string | null,
  genres?: string,
  rangeVote?: string,
  inputOrder?: string,
  page?: number,
) {
  noStore()
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-br&page=${page}&region=br&sort_by=${inputOrder}&with_release_type=2|3${primaryFirstDate}${primaryLastDate}${genres}${rangeVote}`
  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }
  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchMoviesTopRatedFilter(
  primaryFirstDate?: string,
  primaryLastDate?: string | null,
  genres?: string,
  rangeVote?: string,
  inputOrder?: string,
  page?: number,
) {
  noStore()
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-br&page=${page}&region=br&sort_by=${inputOrder}${primaryFirstDate}${primaryLastDate}${genres}${rangeVote}&without_genres=99,10755&vote_count.gte=200`
  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }
  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchTvFilter(
  primaryFirstDate?: string,
  primaryLastDate?: string | null,
  genres?: string,
  rangeVote?: string,
  inputOrder?: string,
  page?: number,
) {
  noStore()
  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-br&page=${page}${primaryFirstDate}${primaryLastDate}&sort_by=${inputOrder}${genres}${rangeVote}`
  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }
  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchTvAiringTodayFilter(
  primaryFirstDate?: string,
  primaryLastDate?: string | null,
  genres?: string,
  rangeVote?: string,
  inputOrder?: string,
  page?: number,
) {
  noStore()
  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=pt-br&page=${page}&sort_by=${inputOrder}${primaryFirstDate}${primaryLastDate}${genres}${rangeVote}`
  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }
  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchTvTopRatedFilter(
  primaryFirstDate?: string,
  primaryLastDate?: string | null,
  genres?: string,
  rangeVote?: string,
  inputOrder?: string,
  page?: number,
) {
  noStore()
  const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=pt-br&page=${page}&region=br&sort_by=${inputOrder}${primaryFirstDate}${primaryLastDate}${genres}${rangeVote}&vote_count.gte=200`
  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }
  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function fetchPopularPerson(page: number) {
  noStore()
  const url = `https://api.themoviedb.org/3/person/popular?language=pt-br&page=${page}`
  const options = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
    },
  }
  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
