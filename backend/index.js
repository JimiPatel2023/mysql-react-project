const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const { connectToDB } = require("./db");
const userRouter = require("./routes/userRoutes");
const todoRouter = require("./routes/todoRoutes");

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectToDB();

app.use("/api/user/", userRouter);
app.use("/api/todo/", todoRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started at port : ", process.env.PORT);
});
