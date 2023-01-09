import React, { useState, useEffect } from "react";

import { searchBooksApi } from "../../utils/API";
import "./SearchBook.css";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import ListOfBooks from "../ListOfBooks/ListOfBooks";
import ErrorModal from "../ErrorModal/ErrorModal";

const SearchBooks = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [debouncedBookName, setDebouncedBookName] = useState(bookName);
  const [listOfBooks, setListOfBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [noBooksFound, setNoBooksFound] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({type: '', error: ''});

  useEffect(() => {
    setNoBooksFound(!bookName ? false : '');
    setIsLoading(!bookName ? false : '');
    setShowError(false);
    setErrorMessage({type: '', error: ''});
    let bookNAuthor=bookName ? (bookName).split(" ").join("+")+(author).split(" ").join("+") : '';
    const timerId = setTimeout(() => {
        setDebouncedBookName(bookNAuthor);
        if (!bookName) {
          setListOfBooks([]);
        } else {
          localStorage.clear();
          localStorage.setItem("name", bookName);
        }
        if(author) {
          localStorage.setItem("author", author);
        }
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [bookName, author]);

  useEffect(() => {
    const search = async () => {
      const response = await searchBooksApi({name:debouncedBookName, type:'search'}).catch((error) => {
          setNoBooksFound(false);
          setIsLoading(false);
          setShowError(true);
          setErrorMessage({type: "Search for books failed", error: error?.message});
      });
      setListOfBooks(response?.data?.result?.items);
      setNoBooksFound(!response?.data?.result?.items ? true : '');
      setIsLoading(false);
    };
    if (debouncedBookName) {
      setIsLoading(true);
      setListOfBooks([]);
      search();
    }
  }, [debouncedBookName]);

  useEffect(() => {
    if(localStorage.getItem("name")) {
      setBookName(localStorage.getItem("name"));
    }
    if(localStorage.getItem("author")) {
      setAuthor(localStorage.getItem("author"));
    }
  },[])

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = listOfBooks?.slice(indexOfFirstBook, indexOfLastBook);

  const renderedResults = (currentBooks?.length > 0) ? currentBooks?.map((book) => (
        <ListOfBooks book={book} key={book.id} searchPage={{setListOfBooks, listOfBooks}}></ListOfBooks>
    )) : '';

  return (
    <div>        
      <div className="ui form container">
            <div className="field">
                <h2 className="field-label">Search Books</h2>
                <input
                value={bookName}
                placeholder="Book Title (Required)"
                onChange={(e) => setBookName(e.target.value)}
                className="input"
                />
            </div>
            <div className="field">
                <input
                    value={author}
                    placeholder="Author (Optional)"
                    onChange={(e) => setAuthor(e.target.value)}
                    className="input"
                />
            </div>
            {(currentBooks?.length > 0) ?
                <div>Page
                    <Pagination
                        booksPerPage={booksPerPage}
                        totalBooks={listOfBooks?.length}
                        paginate={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
                : ''
            }
      </div>
      {isLoading ? <div className="ui items container"><Loading/></div> : '' }

      {noBooksFound ? <div className="ui items container no-data-label"><p>No Books Found</p></div> : ''}

      {showError ? <ErrorModal setShowError={setShowError} errorMessage={errorMessage}></ErrorModal>: ''}

      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default SearchBooks;

