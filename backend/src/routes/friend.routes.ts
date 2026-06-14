import express from "express";
import { getFriends, getFriendRequests, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, removeFriend } from "../controllers/friend.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(protect);

router.get("/", getFriends);
router.get("/requests", getFriendRequests);
router.post("/request", sendFriendRequest);
router.post("/accept/:id", acceptFriendRequest);
router.post("/reject/:id", rejectFriendRequest);
router.delete("/:id", removeFriend);

export default router;
