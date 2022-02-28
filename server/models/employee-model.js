const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Employee = new schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: Number,
    email: String
},
    { timestamps: true }
);

module.exports = mongoose.model("Employee", Employee);