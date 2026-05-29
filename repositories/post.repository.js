import { prisma } from "../prisma/prisma.js";

const createPost = async ({ title, content, authorId, categories }) => {
  const post = await prisma.post.create({
    data: { title, content, authorId, categories },
    include: { categories: true },
  });

  return post;
};

export default {
  createPost,
};
