import { DeleteFilled } from "@ant-design/icons";
import { Button } from "antd";

function Todo({ text, author, created_at, handleDelete }) {
  return (
    <div className="todo">
      <div className="top">
        <div className="text">{text}</div>
        <Button
          type="primary"
          icon={<DeleteFilled />}
          size={"medium"}
          danger
          onClick={handleDelete}
        />
      </div>
      <hr />
      <div className="details">
        <p>Created by {author}</p>
        <p>{created_at}</p>
      </div>
    </div>
  );
}

export default Todo;
