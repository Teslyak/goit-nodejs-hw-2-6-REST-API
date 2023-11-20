import { HttpError } from "../helpers/index.js";

const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  const method = req.method;
  console.log(method);
  if (!keys.length && method === "PUT") {
    return next(HttpError(400, "missing fields"));
  } else if (!keys.length && method === "PATCH") {
    return next(HttpError(400, "missing field favorite"));
  }
  next();
};

export default isEmptyBody;
