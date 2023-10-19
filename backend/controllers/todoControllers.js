const { connection } = require("../db");

const createTodo = async (req, res) => {
  const { text } = req.body;
  if (!text)
    return res.status(400).json({
      error: true,
      message: "Please enter the todo!",
    });
  connection.query(
    "INSERT INTO todos (todo_text, user_id) VALUES (?, ?)",
    [text, req.id],
    (err, result) => {
      if (err)
        return res.status(400).json({
          error: true,
          message: err.sqlMessage,
        });
      connection.query(
        "SELECT * FROM todos WHERE todo_id = ?",
        [result.insertId],
        (err, todo) => {
          res.status(201).json(todo[0]);
        }
      );
    }
  );
};

const getAllTodos = async (req, res) => {
  connection.query(
    "SELECT * FROM todos WHERE user_id = ?",
    [req.id],
    (err, result) => {
      if (err)
        return res.status(400).json({
          error: true,
          message: err.sqlMessage,
        });
      res.status(200).json(result);
    }
  );
};

const deleteTodo = async (req, res) => {
  const { todo_id } = req.params;
  if (!todo_id)
    return res.status(400).json({
      error: true,
      message: "Please enter todo id",
    });
  connection.query(
    "DELETE FROM todos WHERE todo_id = ? AND user_id = ?",
    [todo_id, req.id],
    (err) => {
      if (err)
        return res.status(400).json({ error: true, message: err.sqlMessage });
      res.status(200).json({ message: "Todo deleted" });
    }
  );
};

module.exports = { createTodo, getAllTodos, deleteTodo };
