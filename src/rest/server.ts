import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import config from '../utils/config';

const app = express();
app.use(bodyParser.json());
app.use('/', authRoutes);

export const startRestServer = () => {
  app.listen(config.port, () => {
    console.log(`REST server running at http://localhost:${config.port}/`);
  });
};
