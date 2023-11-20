import express from "express";
import { isEmptyBody, isValidId } from "../../midllewares/index.js";
import validateBody from "../../decorators/validaterBody.js";
import contactsController from "../../controllers/contacts-controller.js";
import {
  contactUpdateSchema,
  contactsAddSchema,
  contactUpFavorSchema,
} from "../../models/contacts.js";

const router = express.Router();

router.get("/", isValidId, contactsController.getAll);

router.get("/:contactId", isValidId, contactsController.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contactsAddSchema),
  contactsController.add
);

router.delete("/:contactId", isValidId, contactsController.deleteById);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsController.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactUpFavorSchema),
  contactsController.updateStatusContact
);

export default router;
