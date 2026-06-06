import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // load post + comments
  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    const res = await api.get(`/posts/${id}`);
    setPost(res.data);
  };

  const fetchComments = async () => {
    const res = await api.get(`/posts/${id}/comments`);
    setComments(res.data);
  };

  // delete post
  const handleDelete = async () => {
    await api.delete(`/posts/${id}`);
    alert("Deleted!");
    navigate("/");
  };

  // add comment
  const handleComment = async () => {
    if (!text) return;

    const res = await api.post(`/posts/${id}/comments`, {
      text,
    });

    setComments([...comments, res.data]);
    setText("");
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <button onClick={handleDelete}>Delete</button>

      <hr />

      <h3>Comments</h3>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write comment..."
      />

      <button onClick={handleComment}>Send</button>

      {comments.map((c) => (
        <p key={c._id}>💬 {c.text}</p>
      ))}
    </div>
  );
}

export default PostDetail;