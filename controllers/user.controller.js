import userRepository from "../repositories/user.repository.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userRepository.getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const user = await userRepository.getUserById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllUsers,
  getUserById,
};
