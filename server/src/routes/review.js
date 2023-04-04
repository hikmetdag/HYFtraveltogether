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
} from "../controllers/review.js";
import { verifyToken } from "../middleware/verifyToken.js";

const reviewRouter = express.Router();

reviewRouter.post("/createReview", verifyToken, createReview);
reviewRouter.put("/update/:id", verifyToken, updateReview);
reviewRouter.get("/", getReviews);
reviewRouter.get("/query", getCityByQuery);
reviewRouter.post("/reviewbyAddress", reviewQueryByAddress);
reviewRouter.get("/find/:id", getReviewById);
reviewRouter.post("/getByUserFav", getByReviewIds);
reviewRouter.get("/sort", sortReviews);
reviewRouter.post("/findBy/userId", getByUserName);

export default reviewRouter;
