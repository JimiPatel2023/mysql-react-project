import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import "./index.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Home from "./pages/Home";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to={"/"} /> : <Register />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to={"/"} /> : <Login />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
