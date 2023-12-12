import { Schema, model } from "mongoose";
import { handleSaveErr, preUpdate } from "./hooks.js";
import Joi from "joi";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },

    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },

    token: String,

    avatarURL: String,
  },

  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErr);
userSchema.post("findOneAndUpdate", handleSaveErr);
userSchema.pre("findOneAndUpdate", preUpdate);

export const userSingupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

export const userUpdSubscrSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({ "any.required": "missing required SUBSCRIPTION field" }),
});

export const userEmailSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "missing required field email" }),
});

const User = model("user", userSchema);

export default User;
