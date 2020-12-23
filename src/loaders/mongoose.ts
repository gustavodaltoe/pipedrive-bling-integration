import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';

export default async (): Promise<Db> => {
  if (!config.databaseURL) {
    throw new Error(
      'Failed to connect to the database. Ensure that the environment variables are defined',
    );
  }

  const { connection } = await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  console.log('Mongoose connected to database ⚡');

  return connection.db;
};
