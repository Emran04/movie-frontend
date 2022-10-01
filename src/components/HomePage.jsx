import React, { useCallback, useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import SingelMovie from './SingleMovie';
import { getMovies } from '../services/movies';
import Search from './Search';

const HomePage = () => {

    const [movies, setMovies] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [q, setQ] = useState('');

    const fetchMovies = useCallback((filters = {}) => {
        setIsLoading(() => true)
        getMovies(filters)
            .then((res) => setMovies(res.data))
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(() => false))
    }, []);

    useEffect(() => {
        fetchMovies()
    }, [fetchMovies]);

    const handleSearchChange = (e) => {
        setQ(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        fetchMovies({s: q})
        console.log('submitted')
    }

    return (
        <div>
            <Search handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange} />
            <Grid container spacing={4}>
                {
                    movies && movies.data.map((movie) => (
                        <Grid item key={movie.id}>
                            <SingelMovie movie={movie} />
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )
}

export default HomePage