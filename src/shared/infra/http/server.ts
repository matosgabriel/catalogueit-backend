import express from 'express';
import cors from 'cors';
import '../typeorm';

import appRoutes from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use(appRoutes);

app.listen(3333, () => {
  console.log('Running at 3333 ;)');
});
