import express from 'express';
import cors from 'cors';
import routes from '../api';
import errorHandler from '../errors/handler';

export default (app: express.Application) => {
  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  app.use(cors());

  app.use(express.json());

  app.use(routes);

  app.use(errorHandler);
};
