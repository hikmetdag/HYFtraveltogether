import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import reviewRouter from "./routes/review.js";
import authRouter from "./routes/auth.js";

// Create an express server
const app = express();

app.set("view engine", "ejs");

// Tell express to use the json middleware
app.use(express.json({ limit: "50mb" }));
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());
app.use(express.urlencoded({ extended: false }, { limit: "50mb" }));

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/user", userRouter);
app.use("/api/review", reviewRouter);
app.use("/api/auth", authRouter);

export default app;
