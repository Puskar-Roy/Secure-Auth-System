import express, { Router } from "express";
import {
  login,
  register,
  verifyEmail,
  verifyLoginOTP,
  getLoginHistory,
  logout,
} from "../controllers/authController";
const router: Router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/verify-email/:id", verifyEmail);
router.post("/verify-login/:id", verifyLoginOTP);
router.get("/login-history/:userId", getLoginHistory);
router.post("/logout/:userId", logout);

export default router;
