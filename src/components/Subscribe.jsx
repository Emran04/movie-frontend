import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { rentMovie } from '../services/movies';

const Subscribe = (props) => {
  const { movieId } = props

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const values = {
      movie_id: movieId,
      days: formData.get('days'),
      payment: formData.get('payment'),
    };
    rentMovie(values)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
  }

  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      component="form" onSubmit={handleSubmit}
      autoComplete="off"
    >
      <p>Movie ID: {movieId}</p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Payment amount"
            name="payment"
            autoComplete="price"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="days"
            label="Input days for rent"
            name="days"
            autoComplete="days"
          />
        </Stack>
      </LocalizationProvider>
      <Button variant="contained" component="label">
        Submit
        <input type="submit" hidden />
      </Button>
    </Box>
  )
}

export default Subscribe