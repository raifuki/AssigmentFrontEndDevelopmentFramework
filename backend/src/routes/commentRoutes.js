const express = require("express");
const router = express.Router();

const {
  getComments,
  addComment,
  deleteComment,
} = require("../controllers/commentController");

const auth = require("../middleware/authMiddleware");

// GET COMMENTS
router.get("/posts/:postId/comments", getComments);

// ADD COMMENT
router.post("/posts/:postId/comments", auth, addComment);

// DELETE COMMENT
router.delete("/comments/:id", auth, deleteComment);

module.exports = router;