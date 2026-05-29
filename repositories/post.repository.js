import { prisma } from "../prisma/prisma.js";

const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: { categories: true, comments: true },
  });

  return posts;
};

const createPost = async ({ title, content, authorId, categories }) => {
  const post = await prisma.post.create({
    data: { title, content, authorId, categories },
    include: { categories: true },
  });

  return post;
};

export default {
  getAllPosts,
  createPost,
};
