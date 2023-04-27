import express from "express";
import {
  createReview,
  getReviews,
  getCityByQuery,
  getReviewById,
  sortReviews,
  updateReview,
  getByReviewIds,
  getByUserName,
  reviewQueryByAddress,
  changeReview,
  deleteReview,
} from "../controllers/review.js";
import { verifyToken } from "../middleware/verifyToken.js";

const reviewRouter = express.Router();

reviewRouter.post("/createReview", createReview);
reviewRouter.put("/update/:id", verifyToken, updateReview);
reviewRouter.get("/", getReviews);
reviewRouter.get("/query", getCityByQuery);
reviewRouter.post("/reviewbyAddress", reviewQueryByAddress);
reviewRouter.get("/find/:id", getReviewById);
reviewRouter.post("/getByUserFav", getByReviewIds);
reviewRouter.get("/sort", sortReviews);
reviewRouter.post("/findBy/userId", getByUserName);
reviewRouter.post("/changeInfo", changeReview);
reviewRouter.delete("/query", deleteReview);

export default reviewRouter;
