import postController from "../controllers/post.controller.js";
import authController from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", postController.getAllPosts);
router.get("/:postId", postController.getPostById);
router.post(
  "/",
  authController.verify,
  postController.postValidators,
  postController.createPost,
);
router.put(
  "/:postId",
  authController.verify,
  postController.postValidators,
  postController.updatePost,
);
router.delete("/:postId", authController.verify, postController.deletePost);
router.patch("/:postId", authController.verify, postController.undeletePost);

export default router;
