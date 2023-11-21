import { Schema, model } from "mongoose";
import { handleSaveErr, preUpdate } from "./hooks.js";
import Joi from "joi";
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);
contactSchema.post("save", handleSaveErr);
contactSchema.post("findOneAndUpdate", handleSaveErr);
contactSchema.pre("findOneAndUpdate", preUpdate);

export const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": ` missing required NAME field`,
  }),
  email: Joi.string().required().messages({
    "any.required": ` missing required EMAIL" field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": ` missing required PHONE field`,
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

export const contactUpFavorSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": ` missing required FAVORITE field`,
  }),
});

export const Contact = model("contact", contactSchema);
