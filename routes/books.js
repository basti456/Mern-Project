const express = require("express");

const router = express.Router();

const { books } = require("../data/books.json");

const { users } = require("../data/users.json");

const { UserModal, BookModel } = require("../modals/index");

const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks
} = require("../controllers/book-controller");

/**
 * Route:"/books"
 * Method:GET
 * Desc:Get all the books
 * Access:public
 * params:None
 */

// router.get("/", (req, res) => {
//   res.status(200).json({
//     suceess: true,
//     message: "Books fetched successfully",
//     data: books,
//   });
// });

router.get("/",getAllBooks);

/**
 * Route:"/books/:id"
 * Method:GET
 * Desc:Get a particular  book
 * Access:public
 * params:id
 */

// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const book = books.find((each) => each.id === id);
//   if (!book) {
//     return res.status(404).json({
//       success: false,
//       data: "Book Doesn't exists",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "Book Found",
//     data: book,
//   });
// });

router.get("/:id", getSingleBookById);

/**
 * Route:"/books/issued"
 * Method:GET
 * Desc:Get a issued books
 * Access:public
 * params:none
 */

router.get("/issued/by-user", (req, res) => {
  const userWithIssuedBook = users.filter((each) => {
    if (each.issuedBook) {
      return each;
    }
  });
  const issuedBooks = [];
  userWithIssuedBook.forEach((each) => {
    const id = each.issuedBook;
    const book = books.find((eachBook) => eachBook.id === id);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;
    issuedBooks.push(book);
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
});

/**
 * Route:"/books/issued"
 * Method:POST
 * Desc:Add a new book
 * Access:public
 * Data: author,id,publisher,price,name,genre
 */

router.post("/", (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No data found to add",
    });
  }
  const book = books.find((each) => each.id === data.id);
  if (book) {
    return res.status(404).json({
      success: false,
      message: "Book with same id exists",
    });
  }
  const allBooks = { ...books, data };
  return res.status(200).json({
    success: true,
    message: "Book added successfully",
    data: allBooks,
  });
});

/**
 * Route:"/users/:id"
 * Method:PUT
 * Desc:update a book by its id
 * Access:public
 * params:id
 */

router.put("/updateBook/:id", (req, res) => {
  const { data } = req.body;
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book with the id doesn't exists",
    });
  }
  const updatedBooks = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: updatedBooks,
  });
});

module.exports = router;
