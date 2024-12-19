import cors from 'cors';
import express, { Application, Request, Response } from "express";


const app: Application = express();

//persers
app.use(express());
app.use(express.json());
app.use(cors());

// application route 
// app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello  from Blog Project');
});

// app.use(globalErrorHandler);
// app.use(notFound);

export default app;