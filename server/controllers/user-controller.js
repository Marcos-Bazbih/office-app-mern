const users = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    register: async (request, response) => {
        if (await users.exists({ email: request.body.email })) return response.status(400).json({ message: "Email exists" });
        bcrypt.hash(request.body.password, 10, async (err, hashPassword) => {
            if (err) return response.status(500).json({ message: "password error" });
            request.body.password = hashPassword;
            await users.create(request.body)
                .then(() => response.status(200).json({ message: "user added successfully" }))
                .catch(err => response.status(500).json(err.message))
        })
    },
    login: async (request, response) => {
        try {
            const user = await users.findOne({ email: request.body.email });
            if (user) {
                bcrypt.compare(request.body.password, user.password, (err, isMatch) => {
                    if (err) return response.status(500).json(err.message);
                    if (!isMatch) return response.status(400).json({ message: "password incorrect" });
                    const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "1h" });
                    return response.status(200).json({ message: "login successful", token });
                });
            }
            else {
                return response.status(400).json({ message: "No user found" });
            };
        }
        catch (err) {
            return response.status(500).json({ message: err.message });
        };
    }
};