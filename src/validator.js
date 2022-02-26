const addBookValidator = (book) => {
  const {
    name = '',
    readPage = 0,
    pageCount = 0,
  } = book;
  const processedName = name && name.trim();
  if (processedName.length <= 0) return 'Gagal menambahkan buku. Mohon isi nama buku';
  if (readPage > pageCount) return 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
  return '';
};

const editBookValidator = (book) => {
  const {
    name = '',
    readPage = 0,
    pageCount = 0,
  } = book;
  const processedName = name && name.trim();
  if (processedName.length <= 0) return 'Gagal memperbarui buku. Mohon isi nama buku';
  if (readPage > pageCount) return 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount';
  return '';
};

module.exports = { addBookValidator, editBookValidator };
