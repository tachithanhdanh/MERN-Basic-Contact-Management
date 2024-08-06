const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel"); // Import the Contact model

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
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

/**
 * @route GET /api/contacts/:id
 * @apiName getContact
 * @description Get contact with id
 * @access private
 */
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  // console.log("The contact id is ", contact.user_id);
  // console.log("The user id is ", req.user.id);
  if (req.user.id !== contact.user_id.toString()) {
    res.status(403);
    throw new Error("User does not have access to other user's contact");
  }
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
 * @access private
 */
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(200).json(contact);
});

/**
 * @route PUT /api/contacts/:id
 * @apiName updateContact
 * @description Update contact with id
 * @access private
 */
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (req.user.id !== contact.user_id.toString()) {
    res.status(403);
    throw new Error(
      "User does not have permission to update other user's contact"
    );
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true, // run validators on the update which is used for required fields
    }
  );
  res.status(200).json(updatedContact);
});

/**
 * @route DELETE /api/contacts/:id
 * @apiName deleteContact
 * @description Delete contact with id
 * @access private
 */
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (req.user.id !== contact.user_id.toString()) {
    res.status(403);
    throw new Error(
      "User does not have permission to delete other user's contact"
    );
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getContacts,
};
