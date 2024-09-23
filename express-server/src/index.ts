import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

var jsonFile = require("../db.json");

app.get('/contacts', (req: Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');
    res.json(jsonFile);
  });
  
  var test = function(req: Request, res: Response) {
    res.set('Access-Control-Allow-Origin', '*');
    //console.log(req.params.contactId); // for checking url param value
    const index = parseInt(req.params.contactId) - 1;
    if (jsonFile.contacts[`${index}`]) {
      res.json(jsonFile.contacts[`${index}`]);
    }
    res.status(500).send("Contact does not exist")
  }
  app.get('/:contactId',test);

  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  