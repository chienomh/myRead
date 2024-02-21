import "../App.css";
import { useState, useEffect } from "react";
import { getAll, update } from "../BooksAPI";
import {
  getCurrentlyReadingBook,
  getReadBook,
  getWantToReadBook,
} from "../utils";
import BookCard from "./BookCard";
import { Link } from "react-router-dom";

function ListBook() {
  const [books, setBooks] = useState([]);
  const getAllBook = async () => {
    const data = await getAll();
    setBooks(data);
  };

  const handleUpdateBook = (book, shelf) => {
    book.shelf = shelf;
    update(book, shelf).then(() => {
      setBooks([...books.filter((b) => b.id !== book.id), book]);
    });
  };

  useEffect(() => {
    getAllBook();
  }, []);

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {getCurrentlyReadingBook(books).map((value) => (
                    <BookCard
                      book={value}
                      onUpdateShelf={handleUpdateBook}
                      key={value.id}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {getWantToReadBook(books).map((value) => (
                    <BookCard
                      book={value}
                      onUpdateShelf={handleUpdateBook}
                      key={value.id}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {getReadBook(books).map((value) => (
                    <BookCard
                      book={value}
                      onUpdateShelf={handleUpdateBook}
                      key={value.id}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    </div>
  );
}

export default ListBook;
