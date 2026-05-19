import { prisma } from "../prisma/prisma.js";

const getAllUsers = async () => {
  const users = await prisma.user.findMany({ include: { comments: true } });
  return users;
};

export default {
  getAllUsers,
};
