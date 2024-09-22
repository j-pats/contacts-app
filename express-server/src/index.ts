import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Typescript express server');
  });
  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
  