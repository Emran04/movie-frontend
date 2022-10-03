import React, { useCallback, useState } from 'react'
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { getMoviesList } from '../services/admin-movie';
import Search from './Search';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SingleAdminMovie from './SingleAdminMovie';
import ImportMovie from './ImportMovie';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MovieList() {
  const [movies, setMovies] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [q, setQ] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = (movie) => {
    setOpen(true);
    setSelectedItem(movie)
  };
  const handleClose = () => setOpen(false);

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
            !isLoading && movies && movies.map((movie) => (
              <Grid item xs={12} sm={6} key={movie.imdbID}>
                <SingleAdminMovie handleOpenImport={handleOpen} movie={movie} />
              </Grid>
            ))
          }
        </Grid>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ImportMovie movie={selectedItem} />
        </Box>
      </Modal>
    </main>
  );
}