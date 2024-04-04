import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createQuestion = async (req: Request, res: Response) => {
  const { courseId, userId, content } = req.body;
  try {
    const createdQuestion = await prisma.question.create({
      data: {
        content: content,
        course: {
          connect: { id: courseId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
    res.json(createdQuestion);
  } catch (err) {
    console.error("Error creating question:", err);
    res.status(400).json({ message: "Failed to create question", error: err });
  }
};
