const mongoose = require("mongoose");

const User = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now },
    isLogin: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
},
    { timestamps: true }
);

module.exports = mongoose.model("User", User);