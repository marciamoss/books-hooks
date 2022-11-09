# React-Book-Search Using React Hooks

**APP Link** https://books-hooks-marciamoss.vercel.app

* A full stack application built with react/hooks, express, mongodb & node.js.
* User searches for books via the Google Books API and the search results are rendered here.
* User has the option to navigate to the book directly to make a purchase.
* User has the option to save/delete book.

If you choose to run this repo locally instead of the cloud hosted link provided above, you will need to clone this repo and in the file `books-hooks/api/src/utils/mongo-setup.js` replace this line `mongoose.connect(process.env.MONGO_URL, { ` with `mongoose.connect("...your mongo url connection", { ` (I set up mongodb using https://cloud.mongodb.com)

* After the above step in the terminal, run `yarn install` and then `yarn start` in both client and api folder simultaneously.

This repo was adapted to run on vercel as MERN app using vercel.json setup from https://github.com/hack4impact-uiuc/mern-template
React hooks tutorial source: Udemy<br/>
Paginate tutorial source: https://www.youtube.com/watch?v=IYCa1F-OWmk
