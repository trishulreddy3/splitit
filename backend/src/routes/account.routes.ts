import express from "express";
import { deleteAccount } from "../controllers/settings.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);
router.delete("/", deleteAccount);

export default router;
