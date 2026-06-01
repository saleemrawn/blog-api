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

export default {
  createComment,
};
