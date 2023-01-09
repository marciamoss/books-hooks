import axios from 'axios';

const BASE_URL = "https://books-hooks-mongo.vercel.app/api";

export const deleteBookApi = (id) => axios.delete(`${BASE_URL}/books/${id}`);

export const getBooksApi = () => axios.get(`${BASE_URL}/books`);

export const saveBookApi = (bookData) => axios.post(`${BASE_URL}/books`, bookData);

export const searchBooksApi = (bookData) => axios.post(`${BASE_URL}/books`, bookData);
