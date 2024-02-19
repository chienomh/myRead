import "../App.css";
import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import { getAll, search } from "../BooksAPI";
import { Link } from "react-router-dom";

export default function Search() {
  const [books, setBooks] = useState([]);
  const [booksOnMyShelt, setBooksOnMyShelf] = useState([]);

  const handleSearch = async (value) => {
    if (value.target.value) {
      const data = await search(value.target.value);
      if (!data.error) {
        let newBook = [...data];
        booksOnMyShelt.forEach((bookOnMyShelt) => {
          const indexBook = books.findIndex(
            (book) => book.id === bookOnMyShelt.id
          );
          if (indexBook > -1) {
            newBook[indexBook] = {
              ...newBook[indexBook],
              shelf: bookOnMyShelt.shelf,
            };
          }
        });
        setBooks(newBook);
      } else {
        setBooks([]);
      }
    } else {
      setBooks([]);
    }
  };

  useEffect(() => {
    (async function () {
      const data = await getAll();
      setBooksOnMyShelf(data);
    })();
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
            <BookCard book={value} key={value.id} />
          ))}
        </ol>
      </div>
    </div>
  );
}
