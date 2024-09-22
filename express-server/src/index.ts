import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

var jsonFile = require("../db.json");

app.get('/contacts', (req: Request, res: Response) => {
    res.json(jsonFile);
  });

  
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  