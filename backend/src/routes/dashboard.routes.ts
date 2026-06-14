import express from "express";
import { getSummary, getActivity } from "../controllers/dashboard.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);

router.get("/summary", getSummary);
router.get("/activity", getActivity);

export default router;
