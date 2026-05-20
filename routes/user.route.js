import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.post("/", userController.userValidators, userController.createUser);
router.put("/:userId", userController.userValidators, userController.updateUser);
router.delete("/:userId", userController.deleteUser);

export default router;
