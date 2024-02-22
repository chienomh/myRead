import "../App.css";
import { useState, useEffect, useCallback } from "react";
import BookCard from "./BookCard";
import { getAll, search, update } from "../BooksAPI";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

export default function Search() {
  const [books, setBooks] = useState([]);
  const [booksOnMyShelt, setBooksOnMyShelf] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCallApiSearch = useCallback(
    debounce(async (query) => {
      const data = await search(query);
      if (!data.error) {
        let newBook = [...data];
        booksOnMyShelt.forEach((bookOnMyShelt) => {
          const indexBook = data.findIndex((book) => {
            return book.id === bookOnMyShelt.id;
          });
          if (indexBook > -1) {
            newBook[indexBook] = {
              ...newBook[indexBook],
              shelf: bookOnMyShelt.shelf,
            };
          }
        });
        setBooks(newBook.filter((book) => book.imageLinks?.thumbnail));
      } else {
        setBooks([]);
      }
    }, 1000),
    [booksOnMyShelt]
  );

  const handleSearch = async (value) => {
    if (value.target.value) {
      handleCallApiSearch(value.target.value);
    } else {
      setBooks([]);
    }
  };

  const handleUpdateBook = (book, shelf) => {
    book.shelf = shelf;
    update(book, shelf);
  };

  useEffect(() => {
    getAll().then((res) => setBooksOnMyShelf(res));
  }, []);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((value) => (
            <BookCard
              book={value}
              key={value.id}
              onUpdateShelf={handleUpdateBook}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}
