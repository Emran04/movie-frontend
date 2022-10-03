import client from './api-client';

export const login = (data) => client.post('/customer/login', data)

export const register = (data) => client.post('/customer/register', data)