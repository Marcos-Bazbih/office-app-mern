const users = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    register: async (request, response) => {
        const { email, password } = request.body;
        if (await users.exists({ email: email })) return response.status(400).json({ message: "Email exists" });
        bcrypt.hash(password, 10, async (err, hashPassword) => {
            if (err) return response.status(500).json({ message: "password error" });
            password = hashPassword;
            await users.create(request.body)
                .then(() => response.status(200).json({ message: "user added successfully" }))
                .catch(err => response.status(500).json(err))
        })
    },
    login: async (request, response) => {
        const { email, password } = request.body;
        if (!await users.exists({ email: email })) return response.status(400).json({ message: "No user found" });
        const user = users.findOne(user => user.email === email);
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return response.status(500).json(err);
            if (!isMatch) return response.status(400).json({ message: "password incorrect" });

            jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "30m" }, (err, token) => {
                if (err) return response.status(500).json(err);
                response.status(200).json({ message: "login successful", token });
            })
        })
    }
};