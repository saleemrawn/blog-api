import commentRepository from "../repositories/comment.repository.js";
import { body, validationResult, matchedData } from "express-validator";

const commentValidators = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Comment is required")
    .isLength({ min: 10 })
    .withMessage("Comment must be minimum 10 characters")
    .escape(),
];

const getComments = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    if (isNaN(postId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    const comments = await commentRepository.getComments(postId);
    if (!comments) {
      return res
        .status(404)
        .json({ success: false, message: "Comments not found" });
    }

    res.json({
      success: true,
      message: "Comments found successfully",
      data: comments,
    });
  } catch (err) {
    next(err);
  }
};

const getCommentsCount = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    if (isNaN(postId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    const count = await commentRepository.getCommentsCount(postId);
    res.json({ success: true, data: count });
  } catch (err) {
    next(err);
  }
};

const createComment = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    if (isNaN(postId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { content } = matchedData(req);

    const comment = await commentRepository.createComment({
      postId: req.body.postId,
      authorId: req.body.authorId,
      content,
    });

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    if (isNaN(postId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    const commentId = parseInt(req.params.commentId);
    if (isNaN(commentId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid comment ID" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { content } = matchedData(req);

    const comment = await commentRepository.updateComment({
      commentId,
      content,
    });

    res.json({
      success: true,
      message: "Comment updated successfully",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    if (isNaN(postId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    const commentId = parseInt(req.params.commentId);
    if (isNaN(commentId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid comment ID" });
    }

    const comment = await commentRepository.deleteComment(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res.json({
      success: true,
      message: "Comment deleted successfully",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

const undeleteComment = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postId);
    if (isNaN(postId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    const commentId = parseInt(req.params.commentId);
    if (isNaN(commentId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid comment ID" });
    }

    const comment = await commentRepository.undeleteComment(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res.json({
      success: true,
      message: "Comment undeleted successfully",
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};
export default {
  getComments,
  getCommentsCount,
  createComment,
  updateComment,
  deleteComment,
  undeleteComment,
  commentValidators,
};
