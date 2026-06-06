const Comment = require("../models/Comment");
const Post = require("../models/Post");

// GET COMMENTS BY POST
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;

    const comment = await Comment.create({
      content,
      author: req.user.userId,
      post: req.params.postId,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE COMMENT
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // chỉ owner comment hoặc owner post mới được xóa
    const post = await Post.findById(comment.post);

    if (
      comment.author.toString() !== req.user.userId &&
      post.author.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();

    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};