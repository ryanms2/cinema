'use server'
import axios from 'axios'

export async function fetchDetails(idPerson: string) {
  const url = `https://api.themoviedb.org/3/person/${idPerson}?language=pt-br`
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

export async function fetchMovieCredits(idPerson: string) {
  const url = `https://api.themoviedb.org/3/person/${idPerson}/movie_credits?language=pt-br&page=1`
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

export async function fetchExternalIds(ExternalIdPerson: string) {
  const url = `https://api.themoviedb.org/3/person/${ExternalIdPerson}/external_ids?language=pt-br&page=1`
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
