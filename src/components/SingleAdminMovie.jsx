import * as React from 'react';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function SingleAdminMovie(props) {
  const { movie, handleOpenImport } = props
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        component="img"
        height="180"
        image={movie?.Poster}
        alt={movie?.Title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie?.Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie?.Year}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleOpenImport(movie)}>Import</Button>
        <Button size="small"><Link to={`/movies/${movie.id}`}>Watch</Link></Button>
      </CardActions>
    </Card>
  );
}
