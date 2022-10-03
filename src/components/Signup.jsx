import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { register } from '../services/customer';
import { CUSTOMER_DATA, CUSTOMER_TOKEN } from "../configs/consts";

export default function SignUp() {
  const [plan, setPlan] = useState('basic');
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      email: data.get('email'),
      password: data.get('password'),
      plan: data.get('plan'),
      name: data.get('name'),
      months: data.get('months'),
    };

    register(values)
      .then((res) => {
        localStorage.setItem(CUSTOMER_DATA, JSON.stringify({
          user: res.data.user,
          plan: res.data.plan,
        }))
        localStorage.setItem(CUSTOMER_TOKEN, res.data.token)
        window.location.href = '/';
      })
      .catch((err) => console.log(err))
  };

  const handlePlanChange = (e) => {
    setPlan(e.target.value)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Customer Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="select-plan">Plan</InputLabel>
            <Select
              labelId="select-plan"
              label="Plan"
              name="plan"
              value={plan}
              onChange={handlePlanChange}
            >
              <MenuItem value={`basic`}>Basic</MenuItem>
              <MenuItem value={`premium`}>Premium</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="months"
            label="Enter number of months"
            name="months"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}