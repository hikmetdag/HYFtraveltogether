import express from "express";
import {
  getUsers,
  userGetById,
  userAddFavorites,
  changeUserInfo,
  getUserByQuery,
  deleteUser,
  sendEmail,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/me", verifyToken, userGetById);
userRouter.post("/change/info", changeUserInfo);
userRouter.post("/me/like/", userAddFavorites);
userRouter.get("/query", getUserByQuery);
userRouter.delete("/query", deleteUser);
userRouter.post("/send-email", sendEmail);

export default userRouter;
