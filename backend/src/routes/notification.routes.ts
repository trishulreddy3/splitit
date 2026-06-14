import express from "express";
import { getNotifications, markAsRead } from "../controllers/notification.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);

router.get("/", getNotifications);
router.put("/read/:id", markAsRead);

export default router;
