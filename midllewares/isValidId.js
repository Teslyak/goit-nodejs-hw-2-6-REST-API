import { HttpError } from "../helpers/index.js";
import { isValidObjectId } from "mongoose";

const isValidId = (req, res, next) => {
  const id = req.params.contactId;
  if (!isValidObjectId(id)) {
    return next(HttpError(404, `${id} is not valid id `));
  }
  next();
};

export default isValidId;
