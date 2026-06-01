import { prisma } from "../prisma/prisma.js";

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

export default {
  createComment,
  updateComment,
  deleteComment,
};
