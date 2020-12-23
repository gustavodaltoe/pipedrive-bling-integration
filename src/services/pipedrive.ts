import { AxiosInstance } from 'axios';
import { Inject, Service } from 'typedi';
import DealDto from '../dtos/pipedrive/DealDto';
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

  async duplicate(id: number) {
    return this.api.post(`/deals/${id}/duplicate`);
  }
}
