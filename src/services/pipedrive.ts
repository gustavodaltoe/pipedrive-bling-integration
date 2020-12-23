import { AxiosInstance } from 'axios';
import { Inject, Service } from 'typedi';
import DealDto from '../dtos/pipedrive/DealDto';
import DealProductDto from '../dtos/pipedrive/DealProductDto';
import PipedriveResponseDto from '../dtos/pipedrive/PipedriveResponseDto';
import scheduleRequests from '../utils/scheduleRequests';

@Service()
export default class PipedriveService {
  constructor(
    @Inject('pipedriveApi')
    private api: AxiosInstance,
  ) {
    scheduleRequests(api, 200);
  }

  async listWonDeals(offset = 0) {
    return this.api.get<PipedriveResponseDto<DealDto>>('/deals', {
      params: {
        status: 'won',
        start: offset,
      },
    });
  }

  async listProductsFromDeal(id: number) {
    return this.api.get<PipedriveResponseDto<DealProductDto>>(
      `/deals/${id}/products`,
    );
  }
}
