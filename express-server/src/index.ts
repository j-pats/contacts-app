import express, { Request, Response } from 'express';
import cors from 'cors';
import { ContactType } from './contactType';

// setup
const app = express();
const port = 3000;
app.use(cors())
app.use(express.json())
// import json file
const jsonFile: { contacts: ContactType[] } = require("../db.json");
// unique id value for creating new contacts, UUID would be better
// Initialized to be at the max id value in the contacts json file
var nextId = 31;

// Get all contacts
app.get('/contacts', (req: Request, res: Response) => {
  res.json(jsonFile);
});
  
// Get a single contact by id
app.get('/:contactId',(req: Request, res: Response) => {
  // Find the contact by ID number
  const index = jsonFile.contacts.findIndex(contact => contact.id == req.params.contactId);
  if (index != -1) {
    res.json(jsonFile.contacts[index]);
  } else {
    res.status(500).send("Contact does not exist")
  }
});

// delete an entry
app.delete('/:contactId', (req: Request, res: Response) => {
  // Find the contact by ID number
  const index = jsonFile.contacts.findIndex(contact => contact.id == req.params.contactId);

  if (index != -1) {
    // delete entry and response with ok
    jsonFile.contacts.splice(index, 1);
    res.status(200).send("Contact deleted");
  } else {
    // respond with error
    res.status(500).send("Cannot delete contact, contact does not exist")
  }
})

// change an entry
app.put('/:contactId', (req: Request, res: Response) => {
  // updated info from request body
  const newContact:ContactType = req.body;
  if (newContact.id != req.params.contactId) {
    res.status(500).send("COntact page id doesn't match id of contact to update")
  }
  // Find the contact by ID number
  const index = jsonFile.contacts.findIndex(contact => contact.id == req.params.contactId);

  if (index !== -1) {
    // Update contact data
    jsonFile.contacts[index] = {
      id: newContact.id, // Do not change the id for the contact being updated
      name: newContact.name,
      email: newContact.email,
      phone: newContact.phone,
    };

    // Send back ok response
    res.status(200).send("Contact updated");
  } else {
    // Error updating contact
    res.status(500).send("Cannot update, contact does not exist")
  }
});

// create a new entry
app.post('/addContact', (req: Request, res: Response) => {
  // updated info from request body
  const newContact:ContactType = req.body;

  // get index to create new contact at
  const index = jsonFile.contacts.length;

  const toAdd:ContactType = {
    id: nextId.toString(),
    name: newContact.name,
    email: newContact.email,
    phone: newContact.phone,
  }

  if (toAdd != null && toAdd != undefined) {
    jsonFile.contacts.push(toAdd)
    // Send back ok response
    nextId = nextId + 1;
    res.status(200).send("Contact added");
  } else {
    // Error updating contact
    res.status(500).send("Error: Cannot add contact")
  }
});


// Server running
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


  