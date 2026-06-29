import { prisma } from "../prisma/prisma.js";

const getComments = async (postId) => {
  const comments = await prisma.comment.findMany({
    where: { postId, deletedAt: null },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          id: true,
          fullName: true,
        },
      },
    },
  });

  return comments;
};

const getCommentsCount = async (postId) => {
  const count = await prisma.comment.count({
    where: { postId, deletedAt: null },
  });

  return count;
};

const createComment = async ({ postId, authorId, content }) => {
  const comment = await prisma.comment.create({
    data: {
      content,
      author: { connect: { id: authorId } },
      post: { connect: { id: postId } },
    },
  });

  return comment;
};

const updateComment = async ({ commentId, content }) => {
  const comment = await prisma.comment.update({
    where: { id: commentId },
    data: { content },
  });

  return comment;
};

const deleteComment = async (commentId) => {
  const comment = await prisma.comment.update({
    where: { id: commentId },
    data: { deletedAt: new Date() },
  });

  return comment;
};

const undeleteComment = async (commentId) => {
  const comment = await prisma.comment.update({
    where: { id: commentId },
    data: { deletedAt: null },
  });

  return comment;
};

export default {
  getComments,
  getCommentsCount,
  createComment,
  updateComment,
  deleteComment,
  undeleteComment,
};
