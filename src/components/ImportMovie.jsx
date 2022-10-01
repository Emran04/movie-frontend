import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {importMovie} from './../services/movies';

const ImportMovie = () => {

  const [data, setData] = useState({
    imdb_id: '',
    rent_from: dayjs(),
    rent_to: dayjs(),
  });

  const handleChange = (fieldName, value) => {
    setData({
      ...data,
      [fieldName]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = data
    formData.rent_from = data.rent_from.format('YYYY-MM-DD')
    formData.rent_to = data.rent_to.format('YYYY-MM-DD')
    importMovie(formData)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
  }

  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <form onSubmit={handleSubmit}>
        <TextField label="IMDB id" value={data.imdb_id} onChange={(e) => handleChange('imdb_id', e.target.value)} variant="standard" />
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
          </Stack>
        </LocalizationProvider>
        <Button variant="contained" component="label">
          Submit
          <input type="submit" hidden />
        </Button>
      </form>
    </Box>
  )
}

export default ImportMovie