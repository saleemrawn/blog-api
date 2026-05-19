import { prisma } from "../prisma/prisma.js";

const getAllUsers = async () => {
  const users = await prisma.user.findMany({ include: { comments: true } });
  return users;
};

const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { comments: true },
  });

  return user;
};

export default {
  getAllUsers,
  getUserById,
};
