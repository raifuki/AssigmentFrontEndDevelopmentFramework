import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/login", {
      email,
      password,
    });

    login(res.data.token);
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
}

export default Login;