import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const res = await api.get(`/posts/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    await api.put(`/posts/${id}`, {
      title,
      content,
    });

    alert("Updated!");
    navigate(`/post/${id}`);
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditPost;