import userRepository from "../repositories/user.repository.js";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userRepository.getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllUsers,
};
