import axios from 'axios';

const BASE_URL = process.env.REACT_APP_VERCEL_URL
  ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
  : 'http://localhost:9000/api';

export const deleteBookApi = (id) => axios.delete(`${BASE_URL}/books/${id}`);

export const getBooksApi = () => axios.get(`${BASE_URL}/books`);

export const saveBookApi = (bookData) => axios.post(`${BASE_URL}/books`, bookData);

export const searchBooksApi = (bookData) => axios.post(`${BASE_URL}/books`, bookData);
