import { HttpError } from "../helpers/index.js";

export const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  console.log(req.body);
  if (!keys.length) {
    return next(HttpError(400, "Body must have fields"));
  }
  next();
};
