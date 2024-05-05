import express, { Router } from "express";
import {getAllUsers,getUser} from '../controllers/userController'
const router: Router = express.Router();

router.get('/',getAllUsers);
router.get('/:userId',getUser);


export default router;
