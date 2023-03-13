const express = require("express");
const {users}=require("./data/users.json")
const app = express();

app.use(express.json());

const port = 8081;

/**
 * Route:"/users"
 * Method:GET
 * Desc:Get all the users
 * Access:public
 * params:None
 */

app.get("/users", (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    });
});
app.get("/", (req, res) => {
    res.status(200).json({
        "message":"Server is started"
    });
});
app.listen(port, () => {
    console.log(`Server started at the port ${port}`);
})