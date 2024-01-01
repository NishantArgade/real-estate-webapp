import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    city,
    country,
    image,
    facilities,
    userEmail,
  } = req.body.data;

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
        owner: { connect: { email: userEmail } },
      },
    });

    res
      .status(201)
      .json({ message: "Residency created successfully", residency });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "A Residency with this address already exists",
      });
    }
    throw new Error(error.message);
  }
});
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residency = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.status(200).json({ residency });
});
export const getSpecificResidency = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const residency = await prisma.residency.findUnique({
    where: {
      id,
    },
  });

  res.status(200).json({ residency });
});
