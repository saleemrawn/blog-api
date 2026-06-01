import authController from "../controllers/auth.controller.js";
import commentController from "../controllers/comment.controller.js";
import { Router } from "express";

const router = Router();

router.post(
  "/:postId/comments",
  authController.verify,
  commentController.commentValidators,
  commentController.createComment,
);

export default router;
