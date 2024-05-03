import express, { Router } from "express";
import {
  login,
  register,
  verifyEmail,
  verifyLoginOTP,
  getLoginHistory
} from "../controllers/authController";
const router: Router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/verify-email/:id", verifyEmail);
router.post("/verify-login/:id", verifyLoginOTP);
router.get('/login-history/:userId',getLoginHistory);

export default router;
