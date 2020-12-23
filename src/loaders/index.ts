import express from 'express';
import dependencyInjector from './dependencyInjector';
import expressLoader from './express';

export default (app: express.Application) => {
  dependencyInjector();

  expressLoader(app);
};
