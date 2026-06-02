import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";
import { body, validationResult, matchedData } from "express-validator";

const userValidators = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha(undefined, { ignore: "'-." })
    .withMessage("First name can only contain letters, apostrophes ('), hyphen (-) or period (.)"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha(undefined, { ignore: "'-." })
    .withMessage("Last name can only contain letters, apostrophes ('), hyphen (-) or period (.)"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isAlphanumeric()
    .withMessage("Username can only contain letters, numbers")
    .isLength({ min: 6 })
    .withMessage("Username should be minimum 6 characters"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password should contain at least: 8 characters, one uppercase letter, one number, one special character",
    ),
  body("role").optional().isIn(["USER", "AUTHOR", "ADMIN"]).withMessage("Invalid role"),
];

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userRepository.getAllUsers();
    res.json({
      success: true,
      message: "Users found successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const user = await userRepository.getUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User found successfully", data: user });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { firstName, lastName, username, password, role } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.createUser({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      role: role ?? "USER",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const { firstName, lastName, password, role } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.updateUser({
      userId,
      firstName,
      lastName,
      password: hashedPassword,
      role: role ?? "USER",
    });

    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const user = await userRepository.deleteUser(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const undeleteUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }

    const user = await userRepository.undeleteUser(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User undeleted successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  undeleteUser,
  userValidators,
};
