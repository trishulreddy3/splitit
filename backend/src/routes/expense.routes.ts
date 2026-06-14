import express from "express";
import { getExpenses, getExpenseById, createExpense, updateExpense, deleteExpense, uploadReceipt } from "../controllers/expense.controller";
import { protect } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getExpenses)
  .post(createExpense);

router.route("/:id")
  .get(getExpenseById)
  .put(updateExpense)
  .delete(deleteExpense);

router.post("/:id/receipt", upload.single("receipt"), uploadReceipt);

export default router;
