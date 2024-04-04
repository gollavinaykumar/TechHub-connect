import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updatePricePlan = async (req: Request, res: Response) => {
  const { id, membership, Number } = req.body;
  try {
    const updatedPricePlan = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        membership: membership,
      },
    });

    res.json(updatedPricePlan);
  } catch (err) {
    res.status(400).json({ message: "failed update plan", err });
  }
};

export const createPayment = async (req: Request, res: Response) => {
  const { id, plan, number } = req.body;
  try {
    const createdPayment = await prisma.payment.create({
      data: {
        user: {
          connect: {
            id: id,
          },
        },
        plan: plan,
        number: number,
      },
    });
    res.json(createdPayment);
  } catch (err) {
    res.status(400).json({ message: "failed to update payment" });
  }
};
