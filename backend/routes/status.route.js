import express from "express";

import { routeProtector } from "../helper/routeProtector.js";
import {
	createStatus,
	deleteStatus,
	getAllStatus,
	getUserStatus,
} from "../controllers/status.controller.js";

const router = express.Router();

router.get("/all", getAllStatus);
router.get("/user/:username", getUserStatus);
router.post("/create", routeProtector, createStatus);
router.delete("/:id", routeProtector, deleteStatus);
 
export default router;