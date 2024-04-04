import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCourse = async (req: Request, res: Response) => {
  const { id }: any = req.body;
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: id,
      },
    });

    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    res.json(course);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const gettedQuestions = await prisma.question.findMany();
    res.json(gettedQuestions);
  } catch (err) {
    res.status(400).json({ message: "failed to fetch questions", err });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const deletedQuestion = await prisma.question.delete({
      where: {
        id: id,
      },
    });
  } catch (err) {
    res.status(400).json({ message: "failed to delete", err });
  }
};
