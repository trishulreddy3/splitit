import express from "express";
import { signup, login, logout, getMe } from "../controllers/auth.controller";
import { signupValidator, loginValidator } from "../validators/auth.validator";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.post("/logout", logout);
router.get("/me", protect, getMe);

export default router;
