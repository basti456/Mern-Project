const express = require("express");
const { users } = require("./data/users.json");
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
  return res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route:"/users/:id"
 * Method:GET
 * Desc:Get a particular  users
 * Access:public
 * params:id
 */
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      data: "User Doesn't exists",
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  }
});


/**
 * Route:"/users"
 * Method:POST
 * Desc:Create a new user
 * Access:public
 * params:None
 */

app.post("/users", (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each) => each.id === id);
    if (user) {
        return res.status(404).json({
            success: false,
            message: "User already exists with the given id"
        });
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    });
    return res.status(201).json({
        success: true,
        message: "User entered successfully",
        data:users
    })
});

/**
 * Route:"/users/:id"
 * Method:PUT
 * Desc:update a user by their id
 * Access:public
 * params:id
 */

app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User doesn't exists with this id",
        })
    }
    const updateUserData = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,
           }
        }
        return each; 
    });
    return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updateUserData
    });
})
/**
 * Route:"/users/:id"
 * Method:DELETE
 * Desc:delete a user by their id
 * Access:public
 * params:id
 */

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exists with this id",
      });
    }
    
})
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is started",
  });
});
app.listen(port, () => {
  console.log(`Server started at the port ${port}`);
});
