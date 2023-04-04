import jwt from "jsonwebtoken";

export const createToken = (id, lifeTime) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: lifeTime,
  });
};

export const createRefreshToken = (id, lifeTime) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: lifeTime,
  });
};
