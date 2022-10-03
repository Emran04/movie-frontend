import * as React from 'react';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

export default function SingleMovie(props) {
  const { movie } = props
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        component="img"
        height="180"
        image={movie.poster}
        alt={movie.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie?.release_year}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><Link to={`/movies/${movie.id}`}>Watch</Link></Button>
        {movie.plan === 'premium' ? <Chip label="Premimum" color="success" /> : null}
      </CardActions>
    </Card>
  );
}
