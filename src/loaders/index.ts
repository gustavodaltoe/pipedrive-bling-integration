import express from 'express';
import dependencyInjector from './dependencyInjector';
import expressLoader from './express';
import mongooseLoader from './mongoose';

export default (app: express.Application) => {
  mongooseLoader();

  dependencyInjector();

  expressLoader(app);
};
