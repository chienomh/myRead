export function getCurrentlyReadingBook(books) {
  return books.filter((x) => x.shelf === "currentlyReading");
}

export function getWantToReadBook(books) {
  return books.filter((x) => x.shelf === "wantToRead");
}

export function getReadBook(books) {
  return books.filter((x) => x.shelf === "read");
}
