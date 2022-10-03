import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { importMovie } from './../services/admin-movie';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ImportMovie = (props) => {
  const { movie } = props

  const [data, setData] = useState({
    rent_from: dayjs(),
    rent_to: dayjs(),
    plan: 'basic'
  });

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (fieldName, value) => {
    setData({
      ...data,
      [fieldName]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const values = {
      imdb_id: movie.imdbID,
      rent_price: formData.get('price'),
      rent_from: data.rent_from.format('YYYY-MM-DD'),
      rent_to: data.rent_to.format('YYYY-MM-DD'),
      plan: data.plan,
    };
    importMovie(values)
      .then((res) => {
        setOpen(true)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Successfully Imported!
        </Alert>
      </Snackbar>
      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '100%' },
        }}
        component="form" onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h3>{movie?.Title}</h3>
        <p>IMDB ID: {movie?.imdbID}</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DesktopDatePicker
              label="Rent from"
              inputFormat="MM/DD/YYYY"
              value={data.rent_from}
              onChange={(value) => handleChange('rent_from', value)}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              label="Rent to"
              inputFormat="MM/DD/YYYY"
              value={data.rent_to}
              onChange={(value) => handleChange('rent_to', value)}
              renderInput={(params) => <TextField {...params} />}
            />
            <FormControl fullWidth>
              <InputLabel id="select-plan">Plan</InputLabel>
              <Select
                labelId="select-plan"
                label="Plan"
                name="plan"
                value={data.plan}
                onChange={(e) => handleChange('plan', e.target.value)}
              >
                <MenuItem value={`basic`}>Basic</MenuItem>
                <MenuItem value={`premium`}>Premium</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Rent price"
              name="price"
              autoComplete="price"
            />
          </Stack>
        </LocalizationProvider>
        <Button variant="contained" component="label">
          Submit
          <input type="submit" hidden />
        </Button>
      </Box>
    </div>
  )
}

export default ImportMovie