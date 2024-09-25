import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors())
var jsonFile = require("../db.json");

// Get all contacts
app.get('/contacts', (req: Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json(jsonFile);
});
  
// Get a single contact
app.get('/:contactId',(req: Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');
  //console.log(req.params.contactId); // for checking url param value
  const index = parseInt(req.params.contactId) - 1;
  if (jsonFile.contacts[`${index}`]) {
    res.json(jsonFile.contacts[`${index}`]);
  } else {
    res.status(500).send("Contact does not exist")
  }
});

// delete an entry
app.delete('/:contactId', (req: Request, res: Response) => {
  //console.log("Attempting to delete contact") // log for debugging
  res.set('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  const index = parseInt(req.params.contactId) - 1; // this is bad, change it
  if (jsonFile.contacts[`${index}`]) {
    // delete entry and response with ok
    delete jsonFile.contacts[`${index}`];
    res.status(200).send("Contact deleted");
  } else {
    // respond with error
    res.status(500).send("Contact does not exist")
  }
})


// Server running
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


  