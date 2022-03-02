const UsersRoutes = require("express").Router();
const { register, login, getUsers } = require("../controllers/user-controller");

UsersRoutes.post("/register", register);
UsersRoutes.post("/login", login);
UsersRoutes.get("/users", getUsers);

module.exports = UsersRoutes;