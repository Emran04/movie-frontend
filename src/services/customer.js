import client from './api-client';

export const login = (data) => client.post('/customer/login', data)