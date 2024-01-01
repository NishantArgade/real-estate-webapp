import { Router } from "express";
import jwtCheck from "../config/auth0Config.js";
import {
  allFavourit,
  bookVisit,
  cancelBookedVisit,
  createUser,
  getAllBookedVisit,
  toFavourit,
} from "../controllers/userController.js";
const router = Router();

router.route("/register").post(jwtCheck, createUser);
router.route("/bookVisit/:id").post(jwtCheck, bookVisit);
router.route("/allBookedVisit").post( getAllBookedVisit);
router.route("/cancelBookedVisit/:id").post(jwtCheck, cancelBookedVisit);
router.route("/toFavourit/:rid").post(jwtCheck, toFavourit);
router.route("/allFavourit").post(jwtCheck, allFavourit);

export default router;
