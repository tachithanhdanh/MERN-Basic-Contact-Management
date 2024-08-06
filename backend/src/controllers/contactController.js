const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel"); // Import the Contact model

/**
 * @route GET /api/contacts/:id
 * @apiName getContact
 * @description Get contact with id
 * @access public
 */
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

/**
 * @route POST /api/contacts
 * @apiName createContact
 * @description Create contact
 * @access public
 */
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  const contact = await Contact.create({ name, email, phone });
  res.status(200).json(contact);
});

/**
 * @route PUT /api/contacts/:id
 * @apiName updateContact
 * @description Update contact with id
 * @access public
 */
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  res
    .status(200)
    .json(updatedContact);
});

/**
 * @route DELETE /api/contacts/:id
 * @apiName deleteContact
 * @description Delete contact with id
 * @access public
 */
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await Contact.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json(contact);
});

/**
 * @route GET /api/contacts
 * @apiName getContacts
 * @description Get contacts
 * @access public
 */
const getContacts = asyncHandler(async (req, res) => {
  // getCotacts from database
  // use async because it is an asynchronous
  // we have to wait for the database to return the contacts
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContacts,
};
