import * as contactsSevice from "../models/contacts.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/HttpError.js";

const getAll = async (req, res) => {
  const result = await contactsSevice.listContacts();
  res.json(result);
};

export const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsSevice.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};
export const add = async (req, res) => {
  const result = await contactsSevice.addContact(req.body);
  res.status(201).json(result);
};

export const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsSevice.removeContact(contactId);
  if (!result) {
    throw HttpError(404, ` Not found`);
  }
  res.json({ message: "contact deleted" });
};

export const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsSevice.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
