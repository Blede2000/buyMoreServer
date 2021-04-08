require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to BuyMoreDatabase"));

app.use(express.json());

const userRouter = require("./routes/user");
app.use("/user", userRouter);

app.listen(3000, () => console.log("BUY MORE DOLLARS SERVER STARTED"));
