require("dotenv").config();
require("./DB");

const express = require("express");
const cors = require("cors");
const EmployeesRoutes = require("./routes/employees-routes");
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/employees", EmployeesRoutes);

app.listen(port);