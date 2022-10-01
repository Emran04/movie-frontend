import Qs from 'qs';
import client from './api-client';

export const getMovies = (filter = {}) => client.get('/movies', {
  params: filter,
  paramsSerializer(params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },
});

export const importMovie = (data) => client.post('/admin/import-movie', data)