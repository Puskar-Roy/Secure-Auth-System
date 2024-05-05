import express, { Router } from "express";
import {
  login,
  register,
  verifyEmail,
  verifyLoginOTP,
  getLoginHistory,
  logout,
  verifyUser,
  changePassword
} from "../controllers/authController";
const router: Router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/verify-email/:id", verifyEmail);
router.post("/verify-login/:id", verifyLoginOTP);
router.get("/login-history/:userId", getLoginHistory);
router.post("/logout/:userId", logout);
router.post("/verify-user/:userId", verifyUser);
router.post("/change-password/:userId", changePassword);

export default router;
