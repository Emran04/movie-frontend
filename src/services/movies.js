import Qs from 'qs';
import client from './api-client';

export const getMovies = (filter = {}) => client.get('/movies', {
  params: filter,
  paramsSerializer(params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },
});

export const movieDetails = (id) => client.get(`/movies/${id}`)

export const rentMovie = (data) => client.post(`/movies/rent`, data)