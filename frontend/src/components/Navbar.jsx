import { Avatar, Button } from "antd";
import React, { useContext } from "react";
import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Navbar() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Todos
      </h1>
      {!isLoggedIn ? (
        <div className="buttons">
          <Button
            type="primary"
            icon={<UserOutlined />}
            size={"large"}
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button>
          <Button
            type="primary"
            icon={<LoginOutlined />}
            size={"large"}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </div>
      ) : (
        <div className="buttons">
          <Avatar
            style={{ backgroundColor: "black", verticalAlign: "middle" }}
            size="large"
            gap={4}
          >
            {user?.name[0].toUpperCase()}
          </Avatar>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            size={"large"}
            onClick={() => {
              logoutUser();
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
