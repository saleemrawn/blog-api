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
      postId,
      authorId: req.user.id,
      content,
    });

    res.json({ success: true, data: comment });
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

    res.json({ success: true, data: comment });
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

    res.json({ success: true, data: comment });
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

    res.json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};
export default {
  createComment,
  updateComment,
  deleteComment,
  undeleteComment,
  commentValidators,
};
