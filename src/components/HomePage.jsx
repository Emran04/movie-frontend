import React, { useCallback, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import SingelMovie from './SingleMovie';
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
    console.log('submitted')
  }

  if (isLoading) {
    return <h4>Loading movies...</h4>
  }
  
  return (
    <main>
      <CssBaseline />
      <Search handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} />
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {
            !isLoading && movies && movies.data.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <SingelMovie movie={movie} />
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </main>
  );
}