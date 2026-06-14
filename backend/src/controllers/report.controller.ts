import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";

export const downloadPdfReport = async (req: AuthRequest, res: Response) => {
  // Mock PDF generation
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
  res.send("PDF Content");
};

export const downloadCsvReport = async (req: AuthRequest, res: Response) => {
  // Mock CSV generation
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=report.csv");
  res.send("CSV,Content");
};
