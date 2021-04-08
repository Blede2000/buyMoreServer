const express = require("express");
const router = express.Router();
var bcrypt = require("bcrypt");
const User = require("../schema/user");

router.get("/", function (req, res) {
    res.send("hello world");
});

const BCRYPT_SALT_ROUNDS = 10;
router.post("/register", async function (req, res, next) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const address2 = req.body.address2;
    const phone = req.body.phone;
    const dateOfBirth = req.body.dateOfBirth;
    const city = req.body.city;
    const province = req.body.province;
    const postalCode = req.body.postalCode;

    bcrypt.hash(password, BCRYPT_SALT_ROUNDS, async function (err, hash) {
        const user = new User({
            firstName,
            lastName,
            email,
            password: hash,
            address,
            address2,
            phone,
            dateOfBirth,
            city,
            province,
            postalCode,
        });
        try {
            const newUser = await user.save();
            res.status(201).json(newUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });
});

module.exports = router;
