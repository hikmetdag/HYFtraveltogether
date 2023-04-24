import mongoose from "mongoose";
const { SchemaTypes } = mongoose;

const reviewSchema = new mongoose.Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "users",
    required: [true, "There must be user id"],
  },
  userName: {
    type: String,
  },
  route: {
    type: String,
  },
  visitedPlace: {
    type: String,
  },
  category: {
    type: Array,
    // required: [true, "Please enter a category"],
  },
  title: {
    type: String,
    required: [true, "Please enter a title"],
  },
  date: {
    type: String,
  },
  score: {
    type: Number,
  },
  photo: {
    type: String,
  },
  likedBy: {
    type: [String],
  },
  description: {
    type: String,
    required: [true, "Please enter a description"],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  comments: {
    type: Array,
  },
});

const Review = mongoose.model("reviews", reviewSchema);

export default Review;
