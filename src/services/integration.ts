import { format } from 'date-fns';
import { Service } from 'typedi';
import CreateOrderDto from '../dtos/bling/CreateOrderDto';
import DealDto from '../dtos/pipedrive/DealDto';
import BlingService from './bling';
import PipedriveService from './pipedrive';

@Service()
export default class IntegrationService {
  constructor(
    private pipedriveService: PipedriveService,
    private blingService: BlingService,
  ) {}

  public async start(offset = 0, totalOrders = 0): Promise<any> {
    const { data: deals } = await this.pipedriveService.listWonDeals(offset);

    // Not awaiting to let the requests on the background
    // and focusing on return the total of created orders
    const blingOrdersPromises = this.createBlingOrdersFromDeals(deals.data);

    const total = totalOrders + blingOrdersPromises.length;

    const hasMorePages =
      deals.additional_data?.pagination.more_items_in_collection || false;
    if (hasMorePages) {
      return this.start(deals.additional_data?.pagination.next_start, total);
    }

    return {
      totalOrders: total,
    };
  }

  private createBlingOrdersFromDeals(deals: DealDto[]) {
    return deals.map(async deal => {
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

      return this.blingService.createOrder(blingOrder);
    });
  }
}
