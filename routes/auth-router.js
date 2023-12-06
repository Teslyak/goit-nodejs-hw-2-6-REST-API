import express from "express";
import { authenticate, isEmptyBody, upload } from "../midllewares/index.js";
import validateBody from "../decorators/validaterBody.js";
import {
  userSingupSchema,
  userSigninSchema,
  userUpdSubscrSchema,
} from "../models/Users.js";
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
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.singout);

authRouter.patch(
  "/",
  authenticate,
  validateBody(userUpdSubscrSchema),
  authController.userUpdSubscr
);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updAvatar
);
export default authRouter;
