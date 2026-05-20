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

const createUser = async ({ firstName, lastName, username, password, role }) => {
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      username,
      password,
      role,
    },
  });

  return user;
};

const updateUser = async ({ userId, firstName, lastName, password, role }) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      firstName,
      lastName,
      password,
      role,
    },
  });

  return user;
};

const deleteUser = async (userId) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { deletedAt: new Date() },
  });

  return user;
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
