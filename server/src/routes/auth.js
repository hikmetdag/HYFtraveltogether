import express from "express";
import {
  loginUser,
  createUser,
  sendLink,
  verifyUser,
  makeNewPassword,
  getAccessToken,
  handleSubmitUserImage,
} from "../controllers/auth.js";
import { verifyToken } from "../middleware/verifyToken.js";

const authRouter = express.Router();

authRouter.post("/create", createUser);
authRouter.post("/login", loginUser);
authRouter.post("/sendLink", sendLink);
authRouter.get("/verifyUser/:id", verifyToken, verifyUser);
authRouter.post("/changePassword/:id", verifyToken, makeNewPassword);
authRouter.post("/token", getAccessToken);
authRouter.post("/profileImage", handleSubmitUserImage);

export default authRouter;
