'use server'
import axios from 'axios'

export async function fetchDetails(idMovie: number) {
  const url = `https://api.themoviedb.org/3/movie/${idMovie}?language=pt-br`
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
