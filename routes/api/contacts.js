import express from "express";
import { isEmptyBody } from "../../midllewares/index.js";
import validateBody from "../../decorators/validaterBody.js";
import contactsController from "../../controllers/contacts-controller.js";
import {
  contatsAddSchema,
  contactUpdateSchema,
} from "../../schemas/contacts-schemas.js";
const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contatsAddSchema),
  contactsController.add
);

router.delete("/:contactId", contactsController.deleteById);

router.put(
  "/:contactId",
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsController.updateById
);

export default router;
