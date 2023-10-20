const { connection } = require("../db");
const generateToken = require("../utils/generateToken");
const hashPassword = require("../utils/hashPassword");
const matchPasswords = require("../utils/matchPasswords");

const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        error: true,
        message: "Please Enter all details",
      });
    }
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err)
          return res.status(400).json({ error: true, message: err.sqlMessage });
        if (result[0]) {
          return res
            .status(400)
            .json({ error: true, message: "Email already exists" });
        } else {
          password = await hashPassword(password);
          connection.query(
            `INSERT INTO users (name, email, password) 
            VALUES (?, ?, ?);`,
            [name, email, password],
            (err) => {
              if (err)
                return res.status(400).json({
                  error: true,
                  message: err.sqlMessage,
                });
              connection.query(
                "SELECT * FROM users WHERE email = ?",
                [email],
                (err, result) => {
                  if (err)
                    return res.status(400).json({
                      error: true,
                      message: err.sqlMessage,
                    });
                  generateToken(result[0].id, res);
                  res.status(201).json(result[0]);
                }
              );
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        error: true,
        message: "please enter email and password",
      });
    let user;
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          return res.status(400).json({ error: true, message: err.sqlMessage });
        }
        if (!result[0]) {
          return res.status(400).json({
            error: true,
            message: "This email doesn't exists. please register!",
          });
        }
        user = result[0];
        const isCorrectPassword = await matchPasswords(password, user.password);
        if (!isCorrectPassword)
          return res
            .status(400)
            .json({ error: true, message: "Invalid email or password" });
        generateToken(user.id, res);
        res.status(200).json(user);
      }
    );
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  console.log(req.cookies);
  res
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({
      message: "logged out",
    });
  console.log(req.cookies);
};

const verifyUser = async (req, res) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(400).json({
      error: true,
      message: "User is not Logged in",
    });
  const jwt = require("jsonwebtoken");
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  connection.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    if (err || !result[0])
      return res.status(400).json({
        error: true,
        message: "User is not Logged in",
      });
    res.status(200).json(result[0]);
  });
};

module.exports = { registerUser, loginUser, logoutUser, verifyUser };
