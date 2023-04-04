import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";
import validationEmail from "../util/validationEmail.js";
import bcrypt from "bcrypt";
import encryptPassword from "../util/encryptPassword.js";

const { SchemaTypes } = mongoose;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  surname: { type: String },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    max: 255,
    unique: true,
    validate: [validationEmail, "Please enter a valid email"],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  photoUser: {
    type: String,
    default: "",
  },
  favReviews: [
    {
      type: SchemaTypes.ObjectId,
      ref: "reviews",
    },
  ],
  introduction: { type: String },
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const newPassword = await encryptPassword(this.password);
  this.password = newPassword;
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Unable to login, try again later");
  }
  throw Error("Unable to login, try again later");
};

const User = mongoose.model("User", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "name",
    "email",
    "surname",
    "password",
    "favReviews",
    "introduction",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  return errorList;
};

export default User;
