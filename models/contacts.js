import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("models", "contacts.json");

const updContacs = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactSearchByID = contacts.find((e) => e.id === contactId);
  return contactSearchByID || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((e) => e.id === contactId);
  if (index === -1) {
    return null;
  }
  const [contactDelByID] = contacts.splice(index, 1);
  await updContacs(contacts);
  return contactDelByID;
};

export const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updContacs(contacts);
  return newContact;
};

export const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await updContacs(contacts);
  return contacts[index];
};
