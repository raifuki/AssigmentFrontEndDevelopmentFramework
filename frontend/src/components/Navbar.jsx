import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;

  return (
    <nav style={{ display: "flex", gap: 10 }}>
      <Link to="/">Home</Link>

      {user ? (
        <>
          <Link to="/create">Create Post</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;