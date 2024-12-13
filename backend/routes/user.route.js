import express from "express";
import { routeProtector } from "../helper/routeProtector.js";
import { getUserProfile, updateUser } from "../controllers/user.controller.js";
import { searchUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.get("/search", searchUsers);
router.post("/update", routeProtector, updateUser);

export default router;