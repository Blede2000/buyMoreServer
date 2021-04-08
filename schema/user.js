const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: "String",
        requiired: true,
    },
    lastName: {
        type: "String",
        requiired: true,
    },
    email: {
        type: "String",
        requiired: true,
    },
    password: {
        type: "String",
        requiired: true,
    },
    address: {
        type: "String",
        requiired: true,
    },
    address2: {
        type: "String",
        requiired: true,
    },
    phone: {
        type: "String",
        requiired: true,
    },
    dateOfBirth: {
        type: "String",
        requiired: true,
    },
    city: {
        type: "String",
        requiired: true,
    },
    province: {
        type: "String",
        requiired: true,
    },
    postalCode: {
        type: "String",
        requiired: true,
    },
});

module.exports = mongoose.model("User", userSchema);
