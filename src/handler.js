const {
  searchBookIndex,
  isIDExist,
  getBookData,
  generateId,
  filterBooks,
  generateDate,
} = require('./helper');
const { addBookValidator, editBookValidator } = require('./validator');
const books = require('./books');

const addBookHandler = (request, h) => {
  const book = request.payload;

  const errorValidation = addBookValidator(book);
  if (errorValidation) {
    const response = h.response({
      status: 'fail',
      message: errorValidation,
    });
    response.code(400);
    return response;
  }

  const id = generateId();
  const currentDate = generateDate();

  const newNote = {
    id,
    ...book,
    finished: book.pageCount === book.readPage,
    insertedAt: currentDate,
    updatedAt: currentDate,
  };

  books.push(newNote);

  const isSuccess = isIDExist(id);

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request) => {
  const bookFiltered = filterBooks(request.query);
  const dataReturn = bookFiltered.map(({ id, name, publisher }) => ({ id, name, publisher }));
  return {
    status: 'success',
    data: {
      books: dataReturn,
    },
  };
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = getBookData(id);

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = request.payload;
  const errorValidation = editBookValidator(book);
  if (errorValidation) {
    const response = h.response({
      status: 'fail',
      message: errorValidation,
    });
    response.code(400);
    return response;
  }

  const updatedAt = generateDate();
  const bookIndex = searchBookIndex(id);

  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      ...book,
      finished: book.pageCount === book.readPage,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = searchBookIndex(id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
