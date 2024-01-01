import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  const data = req.body;

  const isExistsUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (isExistsUser) {
    return res.status(400).json({ error: "User already exists!" });
  }
  const user = await prisma.user.create({ data });
  res.status(201).json({ message: "user created successfully", user });
});

export const bookVisit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { email, date } = req.body;
  const alreadyBookedVisits = await prisma.user.findUnique({
    where: {
      email,
    },
    select: { bookedVisits: true },
  });

  if (alreadyBookedVisits?.bookedVisits.some((resi) => resi.id === id)) {
    return res.status(400).json({
      message: "This Residency Visit has already been Booked by you!",
    });
  } else {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        bookedVisits: {
          push: { id, date },
        },
      },
    });
    res.status(200).json({ message: "Your visit has been Booked" });
  }
});

export const getAllBookedVisit = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const allBookings = await prisma.user.findUnique({
    where: { email },
    select: { bookedVisits: true },
  });

  res.status(200).json({ bookings: allBookings.bookedVisits });
});
export const cancelBookedVisit = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  const allBookings = await prisma.user.findUnique({
    where: { email },
    select: { bookedVisits: true },
  });
  try {
    const index = allBookings.bookedVisits.findIndex(
      (visit) => visit.id === id
    );
    if (index === -1) {
      return res.status(404).json({ errror: "Visit Not Found!" });
    } else {
      allBookings.bookedVisits.splice(index, 1);

      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: allBookings.bookedVisits,
        },
      });

      res.status(200).json({ message: "Booked Visit Cancel Successfully" });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const toFavourit = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  const data = await prisma.user.findUnique({
    where: { email },
    select: { favResidenciesID: true },
  });

  if (data?.favResidenciesID.includes(rid)) {
    //remove
    await prisma.user.update({
      where: { email },
      data: {
        favResidenciesID: {
          set: data.favResidenciesID.filter((resId) => resId !== rid),
        },
      },
    });
    return res
      .status(200)
      .json({ message: "Residency has been Removed From Favourite!" });
  } else {
    // add
    await prisma.user.update({
      where: { email },
      data: {
        favResidenciesID: {
          push: rid,
        },
      },
    });
    return res
      .status(200)
      .json({ message: "Residency has been Added to Favourite!" });
  }
});

export const allFavourit = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const allFav = await prisma.user.findUnique({
    where: { email },
    select: { favResidenciesID: true },
  });

  res.status(200).json({ favouritResidencies: allFav.favResidenciesID });
});
