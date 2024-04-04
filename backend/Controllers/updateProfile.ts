import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateProfile = async (req: Request, res: Response) => {
  const { id, name, email, number, role } = req.body;
  try {
    const updatedProfile = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        mobile: number,
        role: role,
      },
    });
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: "failed to update", err });
  }
};

export const updateProfilePic = async (req: Request, res: Response) => {
  const { id, pic } = req.body;
  try {
    const updatedProfilePic = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        image: pic,
      },
    });
    res.json(updatedProfilePic);
  } catch (err) {
    res.status(400).json({ message: "failed to update pic", err });
  }
};
