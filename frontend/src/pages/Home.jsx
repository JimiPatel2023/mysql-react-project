import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Space, Spin } from "antd";
import { useContext, useEffect } from "react";
import Todo from "../components/Todo";
import { AuthContext } from "../context/authContext";
import { TodoContext } from "../context/todoContext";
import moment from "moment";

function Home() {
  const {
    text,
    todos,
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
  } = useContext(TodoContext);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    getTodos();
  }, []);

  message.config({
    maxCount: 1,
  });
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (todoDeleteInfo.error !== null) {
      if (todoDeleteInfo.error) {
        messageApi.open({
          type: "error",
          content: todoDeleteInfo.message,
        });
      } else {
        messageApi.open({
          type: "success",
          content: todoDeleteInfo.message,
        });
      }
      message.destroy();
      setTodoDeleteInfo({ error: null, message: null });
    }
  }, [todoDeleteInfo]);

  useEffect(() => {
    if (createTodoError) {
      messageApi.open({
        type: "error",
        content: createTodoError,
      });
    }
    message.destroy();
    setCreateTodoError(null);
  }, [createTodoError]);

  useEffect(() => {
    if (todosLoadingError) {
      messageApi.open({
        type: "error",
        content: todosLoadingError,
      });
    }
    message.destroy();
    setTodosLoadingError(null);
  }, [todosLoadingError]);

  return (
    <>
      {contextHolder}
      <div className="home">
        <Space.Compact
          className="todo-input"
          style={{ width: "100%", marginBottom: "20px" }}
        >
          <Input
            placeholder="Enter the todo"
            value={text}
            onChange={(e) => {
              updateText(e.target.value);
            }}
          />
          <Button
            size="large"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              createTodo();
            }}
            loading={createTodoLoading}
            disabled={createTodoLoading}
          >
            ADD
          </Button>
        </Space.Compact>
        {todosLoading && (
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        )}

        {!todosLoading && todos.length === 0 && (
          <div style={{ marginTop: "30px" }}>
            <h1>No todos created yet.</h1>
          </div>
        )}

        {todos.length > 0 &&
          todos?.map((todo, index) => {
            return (
              <Todo
                text={todo?.todo_text}
                author={user?.name}
                created_at={moment(todo?.created_at).calendar()}
                handleDelete={() => {
                  deleteTodo(todo?.todo_id);
                }}
                key={todo.todo_id}
              />
            );
          })}
      </div>
    </>
  );
}

export default Home;
