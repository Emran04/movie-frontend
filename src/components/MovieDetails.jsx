import React, {useCallback, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth } from '../context/auth-context';
import {movieDetails} from '../services/movies';

export default function MovieDetails() {
  const { isCustomerLoggedIn, customer } = useAuth();
  let {movieId} = useParams();
  const [movieData, setMovieData] = useState(null);

  const fetchMovieDetails = useCallback(() => {
    movieDetails(movieId)
    .then((res) => {
      setMovieData(res.data.data)
    })
    .catch((err) => console.log(err))
  }, [movieId])

  useEffect(() => {
    fetchMovieDetails()
  }, [fetchMovieDetails])

  if(!isCustomerLoggedIn) {
    return <h2>Please signup to watch!</h2>
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {
        movieData && <img src={movieData?.poster} alt={movieData?.title} />
      }
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={movieData?.poster}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {customer?.user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}