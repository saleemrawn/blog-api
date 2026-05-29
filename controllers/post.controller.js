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

    return res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export default { createPost, postValidators };
