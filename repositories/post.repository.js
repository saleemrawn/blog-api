import { prisma } from "../prisma/prisma.js";

const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: { categories: true, comments: true },
  });

  return posts;
};

const getPostById = async (postId) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { categories: true, comments: true },
  });

  return post;
};

const createPost = async ({ title, content, authorId, categories }) => {
  const post = await prisma.post.create({
    data: { title, content, authorId, categories },
    include: { categories: true },
  });

  return post;
};

const updatePost = async ({ postId, title, content, categories }) => {
  const post = await prisma.post.update({
    where: { id: postId },
    data: { title, content, categories },
    include: { categories: true, comments: true },
  });

  return post;
};

const deletePost = async (postId) => {
  const post = await prisma.post.update({
    where: { id: postId },
    data: { deletedAt: new Date() },
  });

  return post;
};

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
