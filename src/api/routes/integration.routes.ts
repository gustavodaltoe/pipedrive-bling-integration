import { Request, Response, Router } from 'express';
import Container from 'typedi';
import PipedriveService from '../../services/pipedrive';

const routes = Router();

routes.get('/start', async (req: Request, res: Response) => {
  const pipedriveService = Container.get(PipedriveService);
  const { data } = await pipedriveService.listDeals();
  return res.json(data);
});

export default routes;
