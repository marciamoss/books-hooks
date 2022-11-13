const { errorWrap } = require('../middleware');
const { createResponse } = require('.');
const axios = require("axios");
const Book = require('../models/book');

module.exports = {
  create: errorWrap(async (req, res) => {
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
  findAll: errorWrap(async (req, res) => {
    const response = await Book.find(req.query);
    const statusCode = 200;
    const responseBody = createResponse(
      statusCode,
      'Successfully fetched books',
      response,
    );
    res.status(statusCode).json(responseBody);
  }),
  remove: errorWrap(async (req, res) => {
    Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })
}
