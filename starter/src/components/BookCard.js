import "../App.css";
import PropType from "prop-types";

const shelves = [
  {
    id: 1,
    shelfName: "currentReading",
    shelfDisplayName: "Currently Reading",
  },
  {
    id: 2,
    shelfName: "wantToRead",
    shelfDisplayName: "Want to Read",
  },
  {
    id: 3,
    shelfName: "read",
    shelfDisplayName: "Read",
  },
  {
    id: 4,
    shelfName: "none",
    shelfDisplayName: "None",
  },
];

export default function BookCard({ book, onUpdateShelf }) {
  const handleChangeShelf = async (e) => {
    onUpdateShelf(book, e.target.value);
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks.thumbnail ? book.imageLinks.thumbnail : ""
              })`,
            }}
          ></div>
          <div className="book-shelf-changer">
            {book.shelf ? (
              <select value={book.shelf} onChange={handleChangeShelf}>
                <option value="move" disabled>
                  Move to...
                </option>
                {shelves.map((x) => (
                  <option key={x.id} value={x.shelfName}>
                    {x.shelfDisplayName}
                  </option>
                ))}
              </select>
            ) : (
              <select
                onChange={handleChangeShelf}
                value={book.shelf ? book.shelf : "none"}
              >
                <option value="add" disabled>
                  Add to...
                </option>
                {shelves.map((x) => (
                  <option key={x.id} value={x.shelfName}>
                    {x.shelfDisplayName}
                  </option>
                ))}
              </select>
            )}
            <select></select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.join(", ")}
        </div>
      </div>
    </li>
  );
}

BookCard.prototype = {
  book: PropType.array.isRequired,
  onUpdateShelf: PropType.func,
};
