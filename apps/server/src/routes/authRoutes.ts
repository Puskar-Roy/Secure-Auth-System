import express, { Router } from "express";
import {
  login,
  register,
  verifyEmail,
  verifyLoginOTP
} from "../controllers/authController";
const router: Router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/verify-email/:id", verifyEmail);
router.post("/verify-login/:id", verifyLoginOTP);

export default router;
