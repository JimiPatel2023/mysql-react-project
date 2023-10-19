import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // verify user
  const verifyUser = useCallback(async () => {
    const response = await getRequest(`${baseUrl}/user/verify`);
    if (response.error) {
      setUser(null);
      return setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
    setUser(response);
  });

  useEffect(() => {
    verifyUser();
  }, []);

  // update the register info
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  // update login info
  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  // logout user
  const logoutUser = useCallback(async () => {
    const response = await getRequest(`${baseUrl}/user/logout`);
    verifyUser();
  });

  // login user
  const loginUser = useCallback(async () => {
    setLoginLoading(true);
    setLoginError(null);
    const response = await postRequest(
      `${baseUrl}/user/login`,
      JSON.stringify(loginInfo)
    );
    setLoginLoading(false);
    if (response.error) {
      return setLoginError(response.message);
    }
    setLoginInfo({
      email: "",
      password: "",
    });
    setUser(response);
    verifyUser();
  }, [loginInfo]);

  // register user
  const registerUser = useCallback(async () => {
    setRegisterLoading(true);
    setRegisterError(null);
    const response = await postRequest(
      `${baseUrl}/user/register`,
      JSON.stringify(registerInfo)
    );
    setRegisterLoading(false);
    if (response.error) {
      return setRegisterError(response.message);
    }
    setRegisterInfo({
      name: "",
      email: "",
      password: "",
    });
    setUser(response);
    verifyUser();
  }, [registerInfo]);

  return (
    <AuthContext.Provider
      value={{
        registerInfo,
        registerError,
        registerLoading,
        updateRegisterInfo,
        registerUser,
        isLoggedIn,
        user,
        logoutUser,
        setRegisterError,
        loginInfo,
        loginError,
        loginLoading,
        updateLoginInfo,
        loginUser,
        setLoginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
