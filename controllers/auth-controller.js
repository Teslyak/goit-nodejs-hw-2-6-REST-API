import User from "../models/Users.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import Jimp from "jimp";
import "dotenv/config";
const avatarPath = path.resolve("public", "avatars");

const { JWT_SECRET } = process.env;

const singup = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email);
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPass = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashPass,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const singin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const singout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const userUpdSubscr = async (req, res) => {
  const { _id: owner } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    owner,
    { subscription },
    { new: true }
  );
  res.json(result);
};

const updAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "The avatar file is empty");
  }
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const resizeAvatar = await Jimp.read(oldPath);
  await resizeAvatar.cover(250, 250).writeAsync(oldPath);
  const addUserFilename = `${_id}_${filename}`;
  const newPath = path.join(avatarPath, addUserFilename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", addUserFilename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

export default {
  singup: ctrlWrapper(singup),
  singin: ctrlWrapper(singin),
  getCurrent: ctrlWrapper(getCurrent),
  singout: ctrlWrapper(singout),
  userUpdSubscr: ctrlWrapper(userUpdSubscr),
  updAvatar: ctrlWrapper(updAvatar),
};
