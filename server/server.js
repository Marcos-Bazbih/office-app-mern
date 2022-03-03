require("dotenv").config();
require("./DB");

const express = require("express");
const cors = require("cors");
const EmployeesRoutes = require("./routes/employees-routes");
const UsersRoutes = require("./routes/users-router");
const app = express();
const port = process.env.PORT || 3000;
const passport = require("passport");

require("./config/passport")(passport);

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => { console.log(`listening to port ${port}`); });
app.get("/", (req, res) => { res.json({ message: "Welcome to my site" }) });

app.use(passport.initialize());
app.use("/employees", passport.authenticate('jwt', { session: false }), EmployeesRoutes);
app.use("/auth", UsersRoutes);