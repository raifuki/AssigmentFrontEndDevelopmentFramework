import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Register success!");
      navigate("/login");

    } catch (err) {
      setError("Register failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Register;