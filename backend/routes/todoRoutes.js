const express = require("express");
const {
  createTodo,
  getAllTodos,
  deleteTodo,
} = require("../controllers/todoControllers");
const isValidUser = require("../middlewares/isValidUser");

const router = express.Router();

router.post("/new", isValidUser, createTodo);
router.get("/all", isValidUser, getAllTodos);
router.delete("/:todo_id", isValidUser, deleteTodo);

module.exports = router;
