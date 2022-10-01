import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Search = (props) => {
  const {handleSearchSubmit, handleSearchChange} = props

  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <form onSubmit={handleSearchSubmit}>
      <TextField id="standard-basic" label="Search" onChange={handleSearchChange} variant="standard" />
      <Button variant="contained" component="label">
        Search
        <input type="submit" hidden />
      </Button>
      </form>
    </Box>
  )
}

export default Search