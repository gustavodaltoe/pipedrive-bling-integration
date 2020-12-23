import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import config from './config';
import loaders from './loaders';

const app = express();

loaders(app);

app.listen(config.port, () => {
  console.log(`App running on port ${config.port} ✨`);
});
