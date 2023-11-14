import Joi from "joi";

export const contatsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": ` missing required NAME field`,
  }),
  email: Joi.string().required().messages({
    "any.required": ` missing required EMAIL" field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": ` missing required PHONE field`,
  }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});
