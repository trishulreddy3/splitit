import express from "express";
import { downloadPdfReport, downloadCsvReport } from "../controllers/report.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);
router.get("/pdf", downloadPdfReport);
router.get("/csv", downloadCsvReport);

export default router;
