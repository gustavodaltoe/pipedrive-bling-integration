import 'dotenv/config';
import express, { Router } from 'express';
import cors from 'cors';

const app = express();

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ hello: 'world' });
});

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(3333);
