import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { AuthRoutes } from './app/modules/auth/auth.route';
import globalErrorHandler from './app/modules/middlewares/globalErrorHandler';
import { BlogRoutes } from './app/modules/blog/blog.route';

const app: Application = express();

//persers
app.use(express());
app.use(express.json());
app.use(cors());

// application route
app.use('/api/auth', AuthRoutes);
app.use('/api/blogs', BlogRoutes);
app.use('/api/admin', AuthRoutes);
app.use('/api/admin', BlogRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello  from Blog Project');
});

app.use(globalErrorHandler);
// app.use(notFound);

export default app;
