import express from "express";
import { updateSettings, changePassword, deleteAccount } from "../controllers/settings.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);
router.put("/", updateSettings);
router.post("/change-password", changePassword);

// Frontend calls DELETE /account not /settings/account based on services.ts
// Wait, the router will be mounted at /api/settings. Let's see. 
// services.ts: `deleteAccount: () => unwrap<void>(api.delete("/account"))`
// So it should be on /api/account. We will export a separate route or handle in index.ts

export default router;
