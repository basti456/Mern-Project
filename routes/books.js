const express = require("express");

const router = express.Router();

const { books } = require("../data/books.json");

const { users } = require("../data/users.json");

/**
 * Route:"/books"
 * Method:GET
 * Desc:Get all the books
 * Access:public
 * params:None
 */

router.get("/", (req, res) => {
  res.status(200).json({
    suceess: true,
    message: "Books fetched successfully",
    data: books,
  });
});

/**
 * Route:"/books/:id"
 * Method:GET
 * Desc:Get a particular  book
 * Access:public
 * params:id
 */


router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
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
});


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
    data:issuedBooks
  });
});


module.exports = router;
