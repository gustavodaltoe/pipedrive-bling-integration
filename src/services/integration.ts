import { format } from 'date-fns';
import { Service } from 'typedi';
import CreateOrderDto from '../dtos/bling/CreateOrderDto';
import BlingService from './bling';
import PipedriveService from './pipedrive';

@Service()
export default class IntegrationService {
  constructor(
    private pipedriveService: PipedriveService,
    private blingService: BlingService,
  ) {}

  public async start(): Promise<any> {
    const { data: deals } = await this.pipedriveService.listDeals();

    const resps = await Promise.all(
      deals.data
        .filter(deal => deal.status === 'won')
        .map(async deal => {
          const blingOrder: CreateOrderDto = {
            numero: String(deal.id),
            data: format(new Date(deal.won_time), 'dd-MM-yyyy'),
            cliente: {
              numero: String(deal.person_id.value),
              nome: deal.person_name,
              email: deal.person_id.email[0].value,
              fone: deal.person_id.phone[0].value,
            },
            itens: [
              {
                codigo: '0',
                descricao: 'pipedrive',
                qtde: 1,
                vlr_unit: deal.value,
              },
            ],
          };

          const { data } = await this.blingService.createOrder(blingOrder);
          return data;
        }),
    );

    return resps;
  }
}
