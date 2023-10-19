import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Login() {
  const navigate = useNavigate();
  const {
    loginError,
    loginInfo,
    loginLoading,
    updateLoginInfo,
    loginUser,
    setLoginError,
  } = useContext(AuthContext);

  message.config({
    maxCount: 1,
  });
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (loginError) {
      messageApi.open({
        type: "error",
        content: loginError,
      });
    }
    message.destroy();
    setLoginError(null);
  }, [loginError]);

  return (
    <>
      {contextHolder}
      <div className="register login">
        <h1>Login</h1>
        <Input
          placeholder="Email"
          className="input"
          type="email"
          onChange={(e) => {
            updateLoginInfo({ ...loginInfo, email: e.target.value });
          }}
        />
        <Input.Password
          placeholder="Password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          className="input"
          onChange={(e) => {
            updateLoginInfo({ ...loginInfo, password: e.target.value });
          }}
        />
        <Button
          type="primary"
          block
          className="button"
          size="large"
          onClick={() => loginUser()}
          loading={loginLoading}
          disabled={loginLoading}
        >
          Login
        </Button>
        <div className="alreadyHaveAnAccount">
          <p>Don't have an Account?</p>
          <Button
            type="link"
            size={"large"}
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
}

export default Login;
