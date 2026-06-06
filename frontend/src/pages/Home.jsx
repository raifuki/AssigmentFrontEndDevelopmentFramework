import { useEffect, useState } from "react";
import api from "../api/axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const limit = 5;

  useEffect(() => {
    fetchPosts();
  }, [page, search]);

  const fetchPosts = async () => {
    try {
      const res = await api.get(
        `/posts?page=${page}&limit=${limit}&search=${search}`
      );
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Posts</h1>

      {/* SEARCH */}
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* POSTS */}
      {posts.map((p) => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.content}</p>
        </div>
      ))}

      {/* PAGINATION */}
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span> Page {page} </span>

        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;