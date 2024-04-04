import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCourse = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const course = await prisma.course.findMany({
      where: {
        title: name,
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
