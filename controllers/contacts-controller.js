import * as contactsSevice from "../models/contacts.js";
import { HttpError } from "../helpers/HttpError.js";
import {
  contactUpdateSchema,
  contatsAddSchema,
} from "../schemas/contacts-schemas.js";

export const getAll = async (req, res, next) => {
  try {
    const result = await contactsSevice.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsSevice.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
export const add = async (req, res, next) => {
  try {
    const { error } = contatsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsSevice.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsSevice.removeContact(contactId);
    if (!result) {
      throw HttpError(404, ` Not found`);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await contactsSevice.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};
