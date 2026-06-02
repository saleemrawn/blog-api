import postRepository from "../repositories/post.repository.js";
import { body, validationResult, matchedData } from "express-validator";

const postValidators = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 10 })
    .withMessage("Title must be minimum 10 characters")
    .escape(),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 20 })
    .withMessage("Content must be minimum 20 characters")
    .escape(),
];

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postRepository.getAllPosts();
    res.json({
      success: true,
      message: "Posts found successfully",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    if (isNaN(postId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    const post = await postRepository.getPostById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.json({ success: true, message: "Post found successfully", data: post });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, content } = matchedData(req);

    const post = await postRepository.createPost({
      title,
      content,
      categories: req.body.categories,
      authorId: parseInt(req.user.id),
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const postId = parseInt(req.params.postId);
    if (isNaN(postId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    const { title, content } = matchedData(req);

    const post = await postRepository.updatePost({
      postId,
      title,
      content,
      categories: req.body.categories,
      authorId: parseInt(req.user.id),
    });

    return res.json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    if (isNaN(postId)) {
      return res
        .status(400)
        .json({ success: true, message: "Invalid post ID" });
    }

    const post = await postRepository.deletePost(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.json({
      success: true,
      message: "Post deleted successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

const undeletePost = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    if (isNaN(postId)) {
      return res
        .status(400)
        .json({ success: true, message: "Invalid post ID" });
    }

    const post = await postRepository.undeletePost(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.json({
      success: true,
      message: "Post undeleted successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  undeletePost,
  postValidators,
};
