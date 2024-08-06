const mongoose = require("mongoose");

// Create a schema
// A schema is a blueprint for defining the structure of the documents in a MongoDB collection.
// mongo atlas is a no sql database which stores data in the form of documents
const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the contact name"],
  },
  email: {
    type: String,
    required: [true, "Please add the contact email"],
  },
  phone: {
    type: String,
    required: [true, "Please add the contact phone number"],
  },
}, {
  timestamps: true,
});

// Create a model
// module.exports is used to make the model available in other files
module.exports = mongoose.model("Contact", contactSchema);
