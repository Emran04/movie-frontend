import React, { useCallback, useState } from 'react'
import Grid from '@mui/material/Grid';
import { getMoviesList } from '../services/admin-movie';
import Search from './Search';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SingleAdminMovie from './SingleAdminMovie';

export default function MovieList() {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [q, setQ] = useState('');

  const fetchMovies = useCallback((filters = {}) => {
    setIsLoading(() => true)
    getMoviesList(filters)
      .then((res) => setMovies(res.data?.Search))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(() => false))
  }, []);

  const handleSearchChange = (e) => {
    setQ(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    fetchMovies({ s: q })
  }

  if (isLoading) {
    return <h4>Loading movies...</h4>
  }

  console.log(movies)

  return (
    <main>
      <CssBaseline />
      <Search handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} />
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {
            !isLoading && movies && movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
                <SingleAdminMovie movie={movie} />
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </main>
  );
}