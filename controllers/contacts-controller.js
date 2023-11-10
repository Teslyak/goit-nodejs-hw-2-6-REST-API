import * as contactsSevice from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { isEmptyBody } from "../midllewares/index.js";

export const getAll = async (req, res, next) => {
  try {
    const result = await contactsSevice.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
