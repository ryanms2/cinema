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