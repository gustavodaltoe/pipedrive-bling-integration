import { Router } from 'express';
import integration from './routes/integration.routes';

// guaranteed to get dependencies
const routes = Router();

routes.use('/integration', integration);

export default routes;
