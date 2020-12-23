import { AxiosInstance } from 'axios';
import { Inject, Service } from 'typedi';

@Service()
export default class PipedriveService {
  constructor(
    @Inject('pipedriveApi')
    private api: AxiosInstance,
  ) {}

  public async listDeals(): Promise<any> {
    return this.api.get('/deals');
  }
}
