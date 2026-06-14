import express from "express";
import { createReview, getRandomReview } from "../controllers/review.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/random", getRandomReview); // Public
router.post("/", protect, createReview); // Protected

export default router;
