import * as React from 'react';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function SingelMovie(props) {
  const {movie} = props
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={movie.poster}
        alt={movie.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><Link to={`/movies/${movie.id}`}>Watch</Link></Button>
      </CardActions>
    </Card>
  );
}
