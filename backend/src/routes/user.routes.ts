import express from "express";
import { searchUsers } from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);
router.get("/search", searchUsers);

export default router;
