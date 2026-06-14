import express from "express";
import { getGroups, getGroupById, createGroup, updateGroup, deleteGroup, inviteToGroup, removeMember, leaveGroup, transferOwner, getGroupSummary } from "../controllers/group.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getGroups)
  .post(createGroup);

router.route("/:id")
  .get(getGroupById)
  .put(updateGroup)
  .delete(deleteGroup);

router.post("/:id/invite", inviteToGroup);
router.delete("/:id/member/:memberId", removeMember);
router.post("/:id/leave", leaveGroup);
router.post("/:id/transfer-owner", transferOwner);
router.get("/:id/summary", getGroupSummary);

export default router;
