import * as contactsController from "../../controllers/contacts-controller.js";
import express from "express";
import { isEmptyBody } from "../../midllewares/index.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", isEmptyBody, contactsController.add);

router.delete("/:contactId", contactsController.deleteById);

router.put("/:contactId", isEmptyBody, contactsController.updateById);

export default router;
