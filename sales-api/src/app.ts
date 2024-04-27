import 'dotenv/config';
import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT;

app.get('/api/status', (request: Request, response: Response) => {
  response.status(200).json({
    service: 'Sales-API',
    status: 'up',
    httpStatus: 200,
  });
});

app.listen(PORT, () => {
  console.info(`🚀 Server started successfully at port ${PORT}`);
});
