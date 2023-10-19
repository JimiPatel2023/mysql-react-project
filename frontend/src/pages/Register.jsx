import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Register() {
  const navigate = useNavigate();

  const {
    registerError,
    registerInfo,
    registerLoading,
    updateRegisterInfo,
    registerUser,
    setRegisterError,
  } = useContext(AuthContext);

  message.config({
    maxCount: 1,
  });
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (registerError) {
      messageApi.open({
        type: "error",
        content: registerError,
        key: "mess",
      });
    }
    message.destroy("mess");
    setRegisterError(null);
  }, [registerError]);

  return (
    <>
      {contextHolder}
      <div className="register">
        <h1>Register</h1>
        <Input
          placeholder="Name"
          className="input"
          type="text"
          onChange={(e) => {
            updateRegisterInfo({ ...registerInfo, name: e.target.value });
          }}
        />
        <Input
          placeholder="Email"
          className="input"
          type="email"
          onChange={(e) => {
            updateRegisterInfo({ ...registerInfo, email: e.target.value });
          }}
        />
        <Input.Password
          placeholder="Password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          className="input"
          onChange={(e) => {
            updateRegisterInfo({ ...registerInfo, password: e.target.value });
          }}
        />
        <Button
          type="primary"
          block
          className="button"
          size="large"
          onClick={() => registerUser()}
          loading={registerLoading}
          disabled={registerLoading}
        >
          Create Account
        </Button>
        <div className="alreadyHaveAnAccount">
          <p>Already have an Account?</p>
          <Button
            type="link"
            size={"large"}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
}

export default Register;
