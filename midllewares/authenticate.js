import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import User from "../models/Users.js";
import "dotenv/config";
const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw HttpError(401, "Not authorized");
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    throw HttpError(401, "Not authorized");
  }
};

export default ctrlWrapper(authenticate);