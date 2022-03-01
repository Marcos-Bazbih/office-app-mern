const UsersRoutes = require("express").Router();
const { register, login } = require("../controllers/user-controller");

UsersRoutes.post("/register", register);
UsersRoutes.post("/login", login);

module.exports = UsersRoutes;