import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userProfile = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const getUserProfile = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    res.json(getUserProfile);
  } catch (err) {
    res.status(400).json({ message: "failed to fetch user", err });
  }
};
