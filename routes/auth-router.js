import express from "express";
import { isEmptyBody } from "../midllewares/index.js";
import validateBody from "../decorators/validaterBody.js";
import { userSingupSchema, userSigninSchema } from "../models/Users.js";
import authController from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSingupSchema),
  authController.singup
);

authRouter.post(
  "/login",
  validateBody(userSigninSchema),
  authController.singin
);
export default authRouter;
