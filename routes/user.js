const express = require("express");
const router = express.Router();
var bcrypt = require("bcrypt");
const User = require("../schema/user");

router.get("/", function (req, res) {
    res.send("hello world");
});

const BCRYPT_SALT_ROUNDS = 10;
router.post("/register", async function (req, res) {
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

router.post("/login", async function (req, res) {
    const email = req.body.email;
    const resPwd = req.body.password;
    const users = await User.find({ email }).exec();
    if (users.length == 0)
        res.status(400).json({ message: "No such user in database" });
    // console.log(resPwd);
    // console.log(users[0].password);
    bcrypt.compare(resPwd, users[0].password).then(function (result) {
        console.log(resPwd, users[0].password);
        if (result) {
            res.status(201).json(users[0]);
        } else {
            res.status(400).json({
                message: "Wrong Password",
            });
        }
    });
    // bcrypt.compare(resPwd, users[0].password, async function (err, result) {
    //     console.log(resPwd, users[0].password);
    //     try {
    //         if (result) {
    //             res.status(201).json(user);
    //         } else {
    //             res.status(400).json({
    //                 message: "Wrong Password",
    //             });
    //         }
    //     } catch (err) {
    //         res.status(400).json({ message: err.message });
    //     }
    // });
});

router.post("/win", async function (req, res) {
    const email = req.body.email;
    try {
        let user = await User.findOneAndUpdate(
            { email },
            {
                lastPlayed: new Date(),
                didWin: true,
            }
        );
        user = await User.findOne({ email });
        console.log(user);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.post("/lose", async function (req, res) {
    const email = req.body.email;
    try {
        let user = await User.findOneAndUpdate(
            { email },
            {
                lastPlayed: new Date(),
                didWin: false,
            }
        );
        user = await User.findOne({ email });
        console.log(user);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//
//
// });
// router.post("/lost", async function (req, res) {
//     const email = req.body.email;
//     try {
//         let user = await User.findOneAndUpdate(
//             { email },
//             {
//                 lastPlayed: new Date(),
//                 didWin: false,
//             }
//         );
//         user = await User.findOne({ email });
//         res.status(201).json({ message: "nice" });
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// usersDB
//     .getUserByUsername(username)
//     .then(function (user) {
//         return bcrypt.compare(password, user.password);
//     })
//     .then(function (samePassword) {
//         if (!samePassword) {
//             res.status(403).send();
//         }
//         res.send();
//     })
//     .catch(function (error) {
//         console.log("Error authenticating user: ");
//         console.log(error);
//         next();
//     });
module.exports = router;
