const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const connectToDB = () => {
  connection.connect((err) => {
    if (err) return console.log(err);
    console.log("Connected to MySQL database");
  });
};

module.exports = { connectToDB, connection };
