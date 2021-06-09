import express from 'express';

import '../typeorm';

const app = express();

app.use(express.json());

app.listen(3333, () => {
  console.log('Running at 3333 ;)');
});
