const express = require("express");
const dotenv = require("dotenv");

const DbConnection = require("./databaseConnection");
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
dotenv.config();
const app = express();
DbConnection();
app.use(express.json());
const port = 8081;
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is started",
  });
});

app.use("/users", userRouter);
app.use("/books", bookRouter);

app.listen(port, () => {
  console.log(`Server started at the port ${port}`);
});
