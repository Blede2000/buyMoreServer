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
        required: true,
    },
    address2: {
        type: "String",
        required: true,
    },
    phone: {
        type: "String",
        required: true,
    },
    dateOfBirth: {
        type: "String",
        required: true,
    },
    city: {
        type: "String",
        required: true,
    },
    province: {
        type: "String",
        required: true,
    },
    postalCode: {
        type: "String",
        required: true,
    },
    lastPlayed: {
        type: "Date",
    },
    didWin: {
        type: "Boolean",
        default: null,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);
