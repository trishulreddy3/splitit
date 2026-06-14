import express from "express";
import { getProfile, updateProfile, uploadAvatar } from "../controllers/profile.controller";
import { protect } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = express.Router();

router.use(protect);

router.get("/", getProfile);
router.put("/", updateProfile);
router.post("/avatar", upload.single("avatar"), uploadAvatar);

export default router;
