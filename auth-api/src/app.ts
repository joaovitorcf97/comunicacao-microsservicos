import 'dotenv/config';
import express, { Request, Response } from 'express';
import { createInitialData } from './config/db/initialData';
import { userRouter } from './modules/user/routes/UserRoutes';

const app = express();
const PORT = process.env.PORT;

createInitialData();

app.use(express.json());
app.use(userRouter);
app.get('/api/status', (request: Request, response: Response) => {
  return response.status(200).json({
    service: 'Auth-API',
    status: 'up',
    httpStatus: 200,
  });
});

app.listen(PORT, () => {
  console.info(`🚀 Server started successfully at port ${PORT}`);
});
