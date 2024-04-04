import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  const { title, subTitile, content, image } = req.body;
  try {
    const createdCourse = await prisma.course.create({
      data: {
        title: title,
        subTitile: subTitile,
        content: content,
        image: image,
      },
    });
    res.json(createdCourse);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
};
