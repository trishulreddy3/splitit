import express from "express";
import { getGroups, getGroupById, createGroup, updateGroup, deleteGroup, inviteToGroup, removeMember, leaveGroup, transferOwner, getGroupSummary, getPendingInvites, getSentInvites, getGroupInvites, acceptInvite, rejectInvite } from "../controllers/group.controller";
import { getGroupSettlements } from "../controllers/settlement.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getGroups)
  .post(createGroup);

router.get("/invites/pending", getPendingInvites);
router.get("/invites/sent", getSentInvites);
router.post("/invites/:inviteId/accept", acceptInvite);
router.post("/invites/:inviteId/reject", rejectInvite);

router.route("/:id")
  .get(getGroupById)
  .put(updateGroup)
  .delete(deleteGroup);

router.get("/:id/invites", getGroupInvites);
router.post("/:id/invite", inviteToGroup);
router.delete("/:id/member/:memberId", removeMember);
router.post("/:id/leave", leaveGroup);
router.post("/:id/transfer-owner", transferOwner);
router.get("/:id/summary", getGroupSummary);
router.get("/:groupId/settlements", getGroupSettlements);

export default router;
