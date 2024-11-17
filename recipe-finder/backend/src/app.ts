import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import recipeRoutes from './routes/recipeRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req: Request, res: Response) => {
  console.log('Test route hit');
  res.json({ message: 'Test endpoint working!' });
});

app.use('/api/recipes', recipeRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server. Please try again later.' });
});

export default app;
