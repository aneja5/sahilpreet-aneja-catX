import express from "express";

import { self, login, logout, signup } from "../controllers/authenticate.controller.js";
import { routeProtector } from "../helper/routeProtector.js";

const router = express.Router();

router.get("/me", routeProtector, self);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;