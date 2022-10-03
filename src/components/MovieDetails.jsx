import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { movieDetails } from '../services/movies';
import { CUSTOMER_TOKEN } from "../configs/consts";
import Subscribe from './Subscribe';

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

export default function MovieDetails() {
  let { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [erroMessage, setErroMessage] = useState(null);
  const [shouldSubscribe, setShouldSubscribe] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const fetchMovieDetails = useCallback(() => {
    movieDetails(movieId)
      .then((res) => {
        setMovieData(res.data.data)
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setErroMessage(err.response?.data?.message)
          setShouldSubscribe(true);
        }
      })
  }, [movieId])

  useEffect(() => {
    const customerData = localStorage.getItem(CUSTOMER_TOKEN);
    if (!customerData) {
      setErroMessage('Please signup to watch!');
    } else {
      fetchMovieDetails()
    }

  }, [fetchMovieDetails])

  const actors = movieData?.actors ? movieData.actors.reduce((carry, current, idx) => {
    let sap = '';
    if (idx !== 0) {
      sap = ', ';
    }
    return carry + sap + current?.actor?.name
  }, '') : null

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {
        movieData && (
          <div>
            <img src={movieData?.poster} alt={movieData?.title} />
            <h4>{movieData.title}</h4>
            <p>Release Year: {movieData.release_year}</p>
            <p>Actors: {actors}</p>
          </div>
        )
      }
      {
        erroMessage && <h2>{erroMessage}</h2>
      }
      {
        shouldSubscribe && <Button variant='contained' onClick={handleOpen}>Subscribe now</Button>
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Subscribe movieId={movieId} />
        </Box>
      </Modal>
    </Container>
  );
}