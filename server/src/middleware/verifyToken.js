import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  if (bearerToken) {
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const userId = decodedToken.id;
        User.find({ _id: `${userId}` }).then((user) => {
          if (user) {
            next();
          }
        });
      }
    });
  } else {
    res.sendStatus(403);
  }
};
