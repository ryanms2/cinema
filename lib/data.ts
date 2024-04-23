import axios from "axios";

export async function fetchAll(query: string) {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TOKEN}&query=${query}&include_adult=false&language=pt-br`;
    const options = {
        method: 'GET',
        url: url,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN
        }
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchAllResult(page:number, item: string, query: string) {
  const url = `https://api.themoviedb.org/3/search/${item}?api_key=${process.env.NEXT_PUBLIC_TOKEN}&query=${query}&include_adult=false&language=pt-br&page=${page}`;
  const options = {
      method: 'GET',
      url: url,
      headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN
      }
  };
  try {
      const response = await axios.request(options);
      return response.data;
  } catch (error) {
      console.error(error);
  }
}

export async function fetchMovieAmount(query: string) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=pt-br`
    
    const options = {
        method: 'GET',
        url: url,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
        }
      };
      
      try {
        const response = await axios.request(options)
        return response.data.total_results;
      } catch (error) {
        console.error(error);
      }
      
}

export async function fetchSeriesAmount(query: string) {
    const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=pt-br`
    
    const options = {
        method: 'GET',
        url: url,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
        }
      };
      
      try {
        const response = await axios.request(options)
        return response.data.total_results;
      } catch (error) {
        console.error(error);
      }
}

export async function fetchCollectionsAmount(query: string) {
    const url = `https://api.themoviedb.org/3/search/collection?query=${query}&include_adult=false&language=pt-br`
    
    const options = {
        method: 'GET',
        url: url,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
        }
      };
      
      try {
        const response = await axios.request(options)
        return response.data.total_results;
      } catch (error) {
        console.error(error);
      }
}

export async function fetchPersonAmount(query: string) {
    const url = `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=pt-br`
    
    const options = {
        method: 'GET',
        url: url,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
        }
      };
      
      try {
        const response = await axios.request(options)
        return response.data.total_results;
      } catch (error) {
        console.error(error);
      }
}

export async function fetchPopularMovies(query?: string | null) {
  let url = `https://api.themoviedb.org/3/movie/popular?${query}language=pt-br&page=1`
  if(!query) {
    url = `https://api.themoviedb.org/3/movie/popular?language=pt-br&page=1`
  }
  console.log(url)
    
    const options = {
        method: 'GET',
        url: url,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN,
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error(error);
      }
}

export async function fetchMoviesFilter(primaryFirstDate?: string,primaryLastDate?: string | null, page?:number) {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-br&page=${page}${primaryFirstDate}${primaryLastDate}&sort_by=popularity.desc`;
  const options = {
      method: 'GET',
      url: url,
      headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_TOKEN
      }
  };
  try {
    console.log(url)
      const response = await axios.request(options);
      return response.data;
  } catch (error) {
      console.error(error);
  }
}