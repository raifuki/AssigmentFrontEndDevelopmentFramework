import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    // đổi thành preset thật của bạn
    formData.append("upload_preset", "your_preset");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setImage(data.secure_url);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post("/posts", {
        title,
        content,
        image,
      });

      alert("Post created!");
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Create Post</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mt-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mt-2"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="mt-2"
          type="file"
          onChange={handleUpload}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 mt-3"
        >
          {loading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;