import { Router } from "express";
import jwtCheck from "../config/auth0Config.js";
import {
  createResidency,
  getAllResidencies,
  getSpecificResidency,
} from "../controllers/residencyController.js";

const router = Router();

router.route("/create").post(jwtCheck, createResidency);
router.route("/allResidencies").get(getAllResidencies);
router.route("/:id").get(getSpecificResidency);

export default router;
