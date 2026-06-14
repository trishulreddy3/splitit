import express from "express";
import { getSettlements, getGroupSettlements, markPaid } from "../controllers/settlement.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);

router.get("/", getSettlements);
router.get("/group/:groupId", getGroupSettlements); // Custom path since frontend passes groupId to forGroup, wait frontend does api.get(`/groups/${groupId}/settlements`)
// The frontend uses api.get(`/groups/${groupId}/settlements`) which we should map to the group routes or handle in index routes.
router.post("/mark-paid", markPaid);

export default router;
