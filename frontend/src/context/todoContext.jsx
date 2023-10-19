import { createContext, useCallback, useState } from "react";
import {
  baseUrl,
  deleteRequest,
  getRequest,
  postRequest,
} from "../utils/services";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [createTodoLoading, setCreateTodoLoading] = useState(false);
  const [createTodoError, setCreateTodoError] = useState(null);
  const [todosLoading, setTodosLoading] = useState(false);
  const [todosLoadingError, setTodosLoadingError] = useState(null);
  const [todoDeleteInfo, setTodoDeleteInfo] = useState({
    error: null,
    message: null,
  });

  const updateText = useCallback((txt) => {
    setText(txt);
  }, []);

  const getTodos = useCallback(async () => {
    setTodosLoading(true);
    setTodosLoadingError(null);
    const response = await getRequest(`${baseUrl}/todo/all`);
    setTodosLoading(false);
    if (response.error) {
      return setTodosLoadingError(response.message);
    }
    setTodos(response);
  }, []);

  const createTodo = async () => {
    setCreateTodoLoading(true);
    setCreateTodoError(null);
    const response = await postRequest(
      `${baseUrl}/todo/new`,
      JSON.stringify({ text })
    );
    setCreateTodoLoading(false);
    if (response.error) {
      return setCreateTodoError(response.message);
    }
    updateText("");
    setTodos([...todos, response]);
  };

  const deleteTodo = async (id) => {
    const response = await deleteRequest(`${baseUrl}/todo/${id}`);
    if (response.error) {
      setTodoDeleteInfo({ error: true, message: "Error deleting todo!" });
    } else {
      const temp = todos.filter((todo) => todo.todo_id !== id);
      setTodos(temp);
      setTodoDeleteInfo({ error: false, message: "Todo deleted" });
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        text,
        updateText,
        createTodoLoading,
        createTodoError,
        setCreateTodoError,
        todosLoading,
        todosLoadingError,
        setTodosLoadingError,
        getTodos,
        createTodo,
        deleteTodo,
        todoDeleteInfo,
        setTodoDeleteInfo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
