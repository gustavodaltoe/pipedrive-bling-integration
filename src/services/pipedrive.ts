import { AxiosInstance } from 'axios';
import { Inject, Service } from 'typedi';
import DealDto from '../dtos/pipedrive/DealDto';
import PipedriveResponseDto from '../dtos/pipedrive/PipedriveResponseDto';

@Service()
export default class PipedriveService {
  constructor(
    @Inject('pipedriveApi')
    private api: AxiosInstance,
  ) {}

  async listDeals() {
    return this.api.get<PipedriveResponseDto<DealDto>>('/deals');
  }
}
