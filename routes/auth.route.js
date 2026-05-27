import passport from "passport";
import userRepository from "../repositories/user.repository.js";
import authController from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.post("/login", authController.login);
router.post("/logout", authController.verify, authController.logout);

export default router;
