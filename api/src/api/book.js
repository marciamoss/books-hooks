const express = require('express');
const router = express.Router();
const { errorWrap } = require('../middleware');
const { createResponse } = require('../utils');
const axios = require("axios");

const Book = require('../models/book');

router.post(
  '/',
  errorWrap(async (req, res) => {
    if (req.body.type === 'search') {
      let response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=:${req.body.name}&key=AIzaSyA5c5WsLSg30PL4WJkx92HtHn8JitM_DEo&startIndex=0&maxResults=40`);
      const statusCode = 200;
      const responseBody = createResponse(
        statusCode,
        'Successfully returned search books',
        response.data,
      );
      res.status(statusCode).json(responseBody);
    } else {
      let response = await Book.create(req.body);
      const statusCode = 200;
      const responseBody = createResponse(
        statusCode,
        'Successfully saved book',
        response.data,
      );
      res.status(statusCode).json(responseBody);
    }
  }),
);

router.route('/').get(
  errorWrap(async (req, res) => {
    console.log('here1', req.body);
    const response = await Book.find(req.query);
    const statusCode = 200;
    const responseBody = createResponse(
      statusCode,
      'Successfully fetched books',
      response,
    );
    res.status(statusCode).json(responseBody);
  }),
);

router.route('/:id').get(
  errorWrap(async (req, res) => {
    console.log('here2');
    const response = await Book.findById(req.params.id);
    const statusCode = 200;
    const responseBody = createResponse(
      statusCode,
      'Successfully fetched books',
      response,
    );
    res.status(statusCode).json(responseBody);
  }),
);

module.exports = router;