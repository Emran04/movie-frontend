import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { movieDetails } from '../services/movies';
import { CUSTOMER_TOKEN } from "../configs/consts";

export default function MovieDetails() {
  let { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [erroMessage, setErroMessage] = useState(null);

  const fetchMovieDetails = useCallback(() => {
    movieDetails(movieId)
      .then((res) => {
        setMovieData(res.data.data)
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setErroMessage(err.response?.data?.message)
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {
        movieData && (
          <div>
            <img src={movieData?.poster} alt={movieData?.title} />
            <h4>{movieData.title}</h4>
            <p>{movieData.release_year}</p>
          </div>
        )
      }
      {
        erroMessage && <h2>{erroMessage}</h2>
      }
    </Container>
  );
}