import auth from "../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { UserController } from "./user.controller";
import express from 'express';

const router = express.Router();
// block user by admin route
router.patch('/users/:userId/block',auth(USER_ROLE.admin), UserController.blockUser);

export const UserRoutes = router;