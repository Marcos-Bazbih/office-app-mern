require("dotenv").config();
require("./DB");

const express = require("express");
const cors = require("cors");
const EmployeesRoutes = require("./routes/employees-routes");
const UsersRoutes = require("./routes/users-router");
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.listen(port);

app.get("/", (req, res) => { res.json({ message: "Welcome to my site" }) });
app.use("/employees", EmployeesRoutes);
app.use("/auth", UsersRoutes);