import User from "../models/User.js";
import { logError } from "../util/logging.js";
import nodemailer from "nodemailer";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
  }
};

export const userGetById = async (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    res.status(400).send("Bad Request");
    return;
  }
  try {
    const user = await User.findById(userId).exec();
    if (user) {
      res.status(200).json({ success: true, user });
    }
  } catch (error) {
    res.status(401).json({ success: false });
  }
};

export const userAddFavorites = async (req, res) => {
  const { reviewId, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    const newFavoredPlace = user.favReviews.find((item) => item == reviewId);

    if (!newFavoredPlace) {
      await User.updateOne(
        { _id: userId },
        { $push: { favReviews: reviewId } }
      );
      const newChanges = await User.findById(userId);

      return res
        .status(200)
        .json({ success: true, fav: newChanges.favReviews });
    } else {
      await User.updateOne(
        { _id: userId },
        { $pull: { favReviews: reviewId } }
      );
      const newChanges = await User.findById(userId);

      return res
        .status(200)
        .json({ success: true, fav: newChanges.favReviews });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Something went wrong : Please try again later",
    });
  }
};
export const changeUserInfo = async (req, res) => {
  const { id, name, surname, email, introduction } = req.body;

  try {
    await User.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          surname: surname,
          email: email,
          introduction: introduction,
        },
      }
    );
    const newChange = await User.findById(id);
    res.status(200).json({
      success: true,
      newUserInfo: {
        name: newChange.name,
        surname: newChange.surname,
        email: newChange.email,
        introduction: newChange.introduction,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Something went wrong : Please try again later",
    });
  }
};
export const getUserByQuery = async (req, res) => {
  try {
    const userByQuery = await User.find(req.query);
    res.status(200).json({ success: true, result: userByQuery });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get user, try again later" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.deleteOne(req.query);
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: `No user found wih this id: ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      msg: `User with the id: ${req.params.id} has been deleted`,
    });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, msg: "Unable to delete user" });
  }
};
export const sendEmail = async (req, res) => {
  const { email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "c40hyfmonday@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: "c40hyfmonday@gmail.com",
    to: "c40hyfmonday@gmail.com",
    subject: subject,
    text: message + " from " + email,
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send("Email sent successfully.");
    }
  });
};
