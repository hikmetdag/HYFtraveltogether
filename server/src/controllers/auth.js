import User, { validateUser } from "../models/User.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import validationSchema from "../util/validationSchema.js";
import { createToken, createRefreshToken } from "../util/createToken.js";
import { logError, logInfo } from "../util/logging.js";
import nodemailer from "nodemailer";
import isValidPassword from "../util/isValidPassword.js";
import encryptPassword from "../util/encryptPassword.js";
import jwt from "jsonwebtoken";
import cloudinary from "../util/cloudinary.js";

const options = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const accessToken = createToken(user._id, "2d");
    const refreshToken = createRefreshToken(user._id, "10d");

    res.status(200).json({
      success: true,
      token: accessToken,
      refreshToken: refreshToken,
      user: {
        userId: user._id,
        name: user.name,
        surname: user.surname,
        fav: user.favReviews,
        email: user.email,
        introduction: user.introduction,
        photoProfile: user.photoUser,
      },
    });
  } catch (err) {
    const errors = validationSchema(err);
    res.status(401).json({ success: false, errors });
  }
};

export const createUser = async (req, res) => {
  try {
    const { user } = req.body;

    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user
        )}`,
      });

      return;
    }

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const currentPassword = user.password;

      if (!isValidPassword(currentPassword)) {
        res.status(400).json({ success: false, msg: "Invalid password" });
        return;
      }
      await User.create(user);
      res.status(201).json({
        success: true,
      });
    }
  } catch (error) {
    logInfo(error);
    const errors = validationSchema(error);

    res.status(500).json({ success: false, errors });
  }
};

//Sending reset link to user account
export const sendLink = async (req, res) => {
  const { email } = req.body;
  try {
    const prevUser = await User.findOne({ email });
    if (!prevUser) {
      res.status(400).json({
        success: false,
        msg: `Email no exist. Received: ${JSON.stringify(prevUser)}`,
      });

      return;
    }

    const token = createToken(prevUser._id, "30m");
    const link = `https://c40-team-monday.herokuapp.com/forgotPassword/${prevUser._id}/link?token=${token}`;
    logInfo(link);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "c40hyfmonday@gmail.com",
        pass: process.env.APP_PASSWORD, //this is app password
      },
      from: "c40hyfmonday@gmail.com",
    });

    const mailOptions = {
      from: "c40hyfmonday@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `This link expires in 30 minutes ${link}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        logError(error);
        res.status(500).json({ success: false, msg: "Unable to send email" });
      } else {
        logInfo("Email sent: " + info.response);
      }
    });
    res.status(201).json({
      success: true,
      message:
        "Reset link was emailed to your email account, please check your account. The link will be valid for 30 minutes.",
    });
  } catch (err) {
    const errors = validationSchema(err);
    res.status(400).json({ success: false, errors });
  }
};
//Verifying
export const verifyUser = async (req, res) => {
  const { id } = req.params;
  try {
    const prevUser = await User.findOne({ _id: id });
    if (!prevUser) {
      res.status(400).json({
        success: false,
        message: `User no exist. Received: ${JSON.stringify(prevUser)}`,
      });
      return;
    }

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

//Changing password
export const makeNewPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  const prevUser = await User.findOne({ _id: id });
  if (!prevUser) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  if (!isValidPassword(password)) {
    return res.status(400).json({ success: false, msg: "Invalid password" });
  }
  try {
    const newPassword = await encryptPassword(password);
    const updatePassword = await User.updateOne(
      {
        _id: id,
      },
      {
        password: newPassword,
      }
    );

    res.status(201).json({ success: true, updatePassword });
  } catch (error) {
    logInfo(error);
    res.status(500).json({ success: false, error });
  }
};

export const getAccessToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.status(400).json({ err: "bad request" });

  try {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "invalid refreshToken" });
        } else {
          const userId = decodedToken.id;
          User.find({ _id: `${userId}` }).then((user) => {
            if (user) {
              const accessToken = createToken(userId, "2d");
              const refreshToken = createRefreshToken(userId, "10d");
              res.status(200).json({ accessToken, refreshToken });
            }
          });
        }
      }
    );
  } catch (error) {
    res.status(401);
  }
};

//Profile user image
export const handleSubmitUserImage = async (req, res) => {
  const { photoUser, userId } = req.body;

  try {
    const result = await cloudinary.v2.uploader.upload(
      photoUser,
      options,
      function (error, result) {
        logInfo(error, result);
      }
    );

    const url = result.url;
    await User.updateOne({ _id: userId }, { $set: { photoUser: url } });
    const updatedUserImage = await User.findById(userId);

    res
      .status(200)
      .json({ success: "true", updatedPhoto: updatedUserImage.photoUser });
  } catch (err) {
    logError(err);
    const errors = validationSchema(err);
    res.status(500).json({ success: false, errors });
  }
};
