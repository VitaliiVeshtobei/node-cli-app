const { nanoid } = require("nanoid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    console.table(JSON.parse(contacts));
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find((item) => {
      return contactId.toString() === item.id;
    });
    console.log(contactById);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactsFiltred = contacts.filter((item) => {
      return contactId !== item.id;
    });
    await fs.writeFile(contactsPath, JSON.stringify(contactsFiltred, null, 2));
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const id = nanoid();
    const contacts = await listContacts();
    const contact = { id, name, email, phone };
    contacts.push(contact);

    const newContacts = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, newContacts);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
