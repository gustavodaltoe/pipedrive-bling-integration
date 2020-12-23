import { Request, Response, Router } from 'express';
import Container from 'typedi';
import IntegrationService from '../../services/integration';

const routes = Router();

routes.get('/start', async (req: Request, res: Response) => {
  const integrationService = Container.get(IntegrationService);
  const response = await integrationService.start();

  return res.json(response);
});

export default routes;
