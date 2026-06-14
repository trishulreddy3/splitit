import express from "express";
import { searchGlobal } from "../controllers/search.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);
router.get("/", searchGlobal);

export default router;
