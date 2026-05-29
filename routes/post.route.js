import postController from "../controllers/post.controller.js";
import authController from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.post(
  "/",
  authController.verify,
  postController.postValidators,
  postController.createPost,
);

export default router;
