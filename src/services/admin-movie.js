import Qs from 'qs';
import client from './admin-api-client';

export const getMoviesList = (filter = {}) => client.get('/admin/movies', {
  params: filter,
  paramsSerializer(params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },
});

export const importMovie = (data) => client.post('/admin/import-movie', data)