const Post = require("../models/Post");

// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const post = await Post.create({
      title,
      content,
      category,
      author: req.user.userId,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL POSTS + SEARCH + FILTER + PAGINATION
exports.getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "", category } = req.query;

    const query = {};

    // SEARCH TITLE (case-insensitive)
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // FILTER CATEGORY
    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;

    const posts = await Post.find(query)
      .populate("author", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE POST
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE POST
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // CHECK OWNER
    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE POST
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();

    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// TOGGLE LIKE
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user.userId;

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // UNLIKE
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // LIKE
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      message: isLiked ? "Unliked" : "Liked",
      likesCount: post.likes.length,
      post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};