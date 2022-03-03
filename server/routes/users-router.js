const UsersRoutes = require("express").Router();
const { register, login, getUsers, logout } = require("../controllers/user-controller");

UsersRoutes.get("/", getUsers);
UsersRoutes.post("/", logout);
UsersRoutes.post("/register", register);
UsersRoutes.post("/login", login);

module.exports = UsersRoutes;