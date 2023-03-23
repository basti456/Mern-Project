const { UserModal, BookModal } = require("../modals/index");

exports.getAllBooks = async (req, res) => {
  const books = await BookModal.find();
  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Books fetched successfully",
    data: books,
  });
};

exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await BookModal.findById(id);
  if (!book) {
    return res.status(404).json({
      success: false,
      data: "Book Doesn't exists",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Book Found",
    data: book,
  });
};

exports.getAllIssuedBooks = async (req, res) => {
  const users = await UserModal.find({
    issuedBook: { $exists: true },
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No issue books found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Issued books fetched successfully",
    data: issuedBooks,
  });
};
