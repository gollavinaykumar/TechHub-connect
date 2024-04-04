import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, name, password, mobile } = req.body;
  let hashedPassword = await bcrypt.hash(password, 10);
  try {
    const createdUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        mobile: mobile,
      },
    });
    res.json(createdUser);
  } catch (error) {
    res.status(400).json({ message: "Failed to create user", error });
  }
};
