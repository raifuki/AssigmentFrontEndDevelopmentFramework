const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const auth = require("../middleware/authMiddleware");

// PUBLIC
router.get("/", getPosts);
router.get("/:id", getPostById);

// PRIVATE
router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
const {
  toggleLike
} = require("../controllers/postController");
router.post("/:id/like", auth, toggleLike);