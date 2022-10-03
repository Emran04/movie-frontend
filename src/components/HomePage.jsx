import React, { useCallback, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import SingleMovie from './SingleMovie';
import { getMovies } from '../services/movies';
import Search from './Search';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [q, setQ] = useState('');

  const fetchMovies = useCallback((filters = {}) => {
    setIsLoading(() => true)
    getMovies(filters)
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(() => false))
  }, []);

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies]);

  const handleSearchChange = (e) => {
    setQ(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    fetchMovies({ s: q })
  }

  if (isLoading) {
    return (
      <main>
        <CssBaseline />
        <h4>Loading movies...</h4>
      </main>
    )
  }

  return (
    <main>
      <CssBaseline />
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Search handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} />
          </Grid>
          {
            !isLoading && movies && movies.data.map((movie) => (
              <Grid item xs={12} sm={6} key={movie.id}>
                <SingleMovie movie={movie} />
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </main>
  );
}