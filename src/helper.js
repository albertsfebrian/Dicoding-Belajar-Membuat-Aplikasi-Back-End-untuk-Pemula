const { nanoid } = require('nanoid');
const books = require('./books');

const searchBookIndex = (id) => books.findIndex((book) => book.id === id);
const isIDExist = (id) => searchBookIndex(id) !== -1;
const getBookData = (id) => books.filter((book) => book.id === id)[0];

const generateId = () => {
  let id = nanoid(16);
  while (isIDExist(id)) {
    id = nanoid(16);
  }
  return id;
};

const toStringUpperCase = (data) => {
  const string = `${data}`;
  return string.toUpperCase();
};

const filterBookName = (booksData, queryName) => {
  if (queryName === undefined) return booksData;
  return booksData.filter(({ name }) => {
    const processBookKey = toStringUpperCase(name);
    const processQueryName = toStringUpperCase(queryName);
    return processBookKey.includes(processQueryName);
  });
};

const filterReadingName = (booksData, queryReading) => {
  if (queryReading === undefined) return booksData;
  return booksData.filter(({ reading }) => Number(reading) === Number(queryReading));
};

const filterFinishedName = (booksData, queryFinished) => {
  if (queryFinished === undefined) return booksData;
  return booksData.filter(({ finished }) => Number(finished) === Number(queryFinished));
};

const filterBooks = (query) => {
  const { name, reading, finished } = query;
  const bookNameFiltered = filterBookName(books, name);
  const bookReadingFiltered = filterReadingName(bookNameFiltered, reading);
  const bookFinishedFiltered = filterFinishedName(bookReadingFiltered, finished);
  return bookFinishedFiltered;
};

const generateDate = () => new Date().toISOString();

module.exports = {
  searchBookIndex,
  isIDExist,
  getBookData,
  generateId,
  filterBooks,
  generateDate,
};
