import Review from "../models/Review.js";
import { logError, logInfo } from "../util/logging.js";
import validationSchema from "../util/validationSchema.js";
import cloudinary from "../util/cloudinary.js";

const cloudinaryOptions = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

export const createReview = async (req, res) => {
  const {
    user,
    userName,
    visitedPlace,
    date,
    category,
    score,
    title,
    description,
    photo,
  } = req.body;

  const newReview = {
    user,
    userName,
    visitedPlace,
    date,
    category,
    score,
    title,
    description,
    photo: undefined,
  };

  try {
    if (photo) {
      const result = await cloudinary.v2.uploader.upload(
        photo,
        cloudinaryOptions
      );
      const { url } = result;

      if (!url) {
        throw Error("No URL was returned in the result");
      } else {
        newReview.photo = url;
      }
    }
  } catch (err) {
    logError(err);

    res
      .status(500)
      .json({ success: false, errors: ["Unable to upload picture"] });
    return;
  }

  try {
    const savedReview = await Review.create(newReview);

    res.status(200).json({ success: "true", msg: savedReview });
  } catch (err) {
    const errors = validationSchema(err);
    logError(errors);
    res.status(500).json({ success: false, errors });
  }
};

export const updateReview = async (req, res) => {
  if (req.body.likedBy) {
    try {
      let doc = await Review.updateOne(
        { _id: req.params.id },
        { likedBy: [...req.body.likedBy] }
      );
      res.status(200).json({ success: "true", msg: doc });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (req.body.comments) {
    try {
      await Review.updateOne(
        { _id: req.params.id },
        {
          $push: {
            comments: {
              comment: req.body.comments,
              userName: req.body.userName,
              userPhoto: req.body.userPhoto,
            },
          },
        }
      );
      const allComments = await Review.findById(req.params.id);

      res.status(200).json({ success: "true", comments: allComments.comments });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export const getReviews = async (req, res) => {
  try {
    const getReviews = await Review.find();
    res.status(200).json({ success: true, result: getReviews });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get reviews, try again later" });
  }
};

export const getCityByQuery = async (req, res) => {
  try {
    const cityByQuery = await Review.find(req.query);
    res.status(200).json({ success: true, result: cityByQuery });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get reviews, try again later" });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const getReviewId = await Review.findById(req.params.id);
    res.status(200).json({ success: true, result: getReviewId });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get review, try again later" });
  }
};

export const sortReviews = async (req, res) => {
  try {
    const getReviews = await Review.find().sort({ score: -1 });
    res.status(200).json({ success: true, result: getReviews });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get reviews, try again later" });
  }
};
export const getByReviewIds = async (req, res) => {
  const { reviewIds } = req.body;
  try {
    const favoredReviews = await Review.find({ _id: { $in: reviewIds } });
    res.status(200).json({ success: true, favoredReviews: favoredReviews });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Something went wrong, please try again in a bit",
    });
  }
};

export const getByUserName = async (req, res) => {
  const { userId } = req.body;

  try {
    const reviews = await Review.find({ user: { $in: userId } });

    res.status(200).json({ success: true, userReviews: reviews });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: "Something went wrong, please try again" });
  }
};

export const reviewQueryByAddress = async (req, res) => {
  const inputPlace = req.body.label;
  try {
    const reviews = await Review.find({
      visitedPlace: { $regex: inputPlace },
    });
    if (reviews) {
      res.status(200).json({ success: true, reviews });
    } else {
      res.status(400).json({ success: false, message: "There is no records" });
    }
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

export const changeReview = async (req, res) => {
  const {
    id,
    user,
    userName,
    visitedPlace,
    date,
    category,
    score,
    title,
    description,
  } = req.body;
  logInfo(id);
  try {
    await Review.updateOne(
      { _id: id },
      {
        $set: {
          user: user,
          userName: userName,
          visitedPlace: visitedPlace,
          date: date,
          category: category,
          score: score,
          title: title,
          description: description,
        },
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Something went wrong : Please try again later",
    });
  }
};
