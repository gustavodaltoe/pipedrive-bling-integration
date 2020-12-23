import { Request, Response, Router } from 'express';
import Container from 'typedi';
import IntegrationService from '../../services/integration';

const routes = Router();

routes.post('/start', async (req: Request, res: Response) => {
  const integrationService = Container.get(IntegrationService);
  const totalOrders = await integrationService.start();

  return res.json(totalOrders);
});

routes.get('/orders', async (req: Request, res: Response) => {
  const integrationService = Container.get(IntegrationService);
  const orders = await integrationService.findAll();

  return res.json(orders);
});

export default routes;
