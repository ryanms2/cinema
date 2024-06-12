'use server'
import axios from 'axios'

export async function fetchDetails(idTv: string) {
  const url = `https://api.themoviedb.org/3/tv/${idTv}?language=pt-br`
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

export async function fetchRecomendations(idTv: string) {
  const url = `https://api.themoviedb.org/3/tv/${idTv}/recommendations?language=pt-br&page=1`
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

export async function fetchMainCast(idTv: string) {
  const url = `https://api.themoviedb.org/3/tv/${idTv}/credits?language=pt-br&page=1`
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

export async function fetchTvTrailer(idTv: string) {
  const url = `https://api.themoviedb.org/3/tv/${idTv}/videos?language=pt-br&page=1`
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

export async function fetchWatchProviders(idTv: string) {
  const url = `https://api.themoviedb.org/3/tv/${idTv}/watch/providers`
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
