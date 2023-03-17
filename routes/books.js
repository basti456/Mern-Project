const express = require("express");

const router = express.Router();

const { books } = require("../data/books.json");

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
  } else {
    return res.status(200).json({
      success: true,
      message: "Book Found",
      data: book,
    });
  }
});

module.exports = router;
