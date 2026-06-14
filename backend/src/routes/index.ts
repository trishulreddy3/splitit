import express from "express";
import authRoutes from "./auth.routes";
import dashboardRoutes from "./dashboard.routes";
import friendRoutes from "./friend.routes";
import groupRoutes from "./group.routes";
import expenseRoutes from "./expense.routes";
import settlementRoutes from "./settlement.routes";
import activityRoutes from "./activity.routes";
import notificationRoutes from "./notification.routes";
import profileRoutes from "./profile.routes";
import settingsRoutes from "./settings.routes";
import accountRoutes from "./account.routes";
import reportRoutes from "./report.routes";
import searchRoutes from "./search.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/friends", friendRoutes);
router.use("/groups", groupRoutes);
router.use("/expenses", expenseRoutes);
router.use("/settlements", settlementRoutes);
router.use("/activity", activityRoutes);
router.use("/notifications", notificationRoutes);
router.use("/profile", profileRoutes);
router.use("/settings", settingsRoutes);
router.use("/account", accountRoutes);
router.use("/reports", reportRoutes);
router.use("/search", searchRoutes);

export default router;
