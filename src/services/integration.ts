import { format } from 'date-fns';
import { Inject, Service } from 'typedi';
import { Model } from 'mongoose';
import CreateOrderDto from '../dtos/bling/CreateOrderDto';
import DealDto from '../dtos/pipedrive/DealDto';
import BlingService from './bling';
import PipedriveService from './pipedrive';
import { IOrder } from '../interfaces/IOrder';
import ItemDto from '../dtos/bling/ItemDto';

@Service()
export default class IntegrationService {
  constructor(
    private pipedriveService: PipedriveService,
    private blingService: BlingService,
    @Inject('orderModel')
    private orderModel: Model<IOrder>,
  ) {}

  async start(offset = 0, totalOrders = 0): Promise<any> {
    const { data: deals } = await this.pipedriveService.listWonDeals(offset);

    // Not awaiting to let the creation requests on the background
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
      const isOrderAlreadyCreated = !!(await this.orderModel.findOne({
        pipedriveId: deal.id,
      }));
      if (isOrderAlreadyCreated) return;

      const itens = await this.getParsedItensFromDeal(deal);

      const blingOrder: CreateOrderDto = {
        numero: String(deal.id),
        data: format(new Date(deal.won_time), 'dd-MM-yyyy'),
        cliente: {
          numero: String(deal.person_id.value),
          nome: deal.person_name,
          email: deal.person_id.email[0].value,
          fone: deal.person_id.phone[0].value,
        },
        itens,
      };

      await this.blingService.createOrder(blingOrder);
      this.orderModel.create({
        pipedriveId: deal.id,
        date: new Date(deal.won_time),
        totalValue: deal.value,
      });
    });
  }

  private async getParsedItensFromDeal(deal: DealDto): Promise<ItemDto[]> {
    const {
      data: dealItens,
    } = await this.pipedriveService.listProductsFromDeal(deal.id);

    const isDealWithoutProducts = !dealItens.data;
    if (isDealWithoutProducts) {
      return [
        {
          codigo: '0',
          descricao: 'pipedrive',
          qtde: 1,
          vlr_unit: deal.value,
          vlr_desconto: 0,
          un: 'un',
        },
      ];
    }

    const itens: ItemDto[] = dealItens.data.map(item => {
      return {
        codigo: String(item.product_id),
        descricao: item.name,
        qtde: item.quantity,
        vlr_unit: item.item_price,
        un: 'un',
        vlr_desconto: item.discount_percentage,
      };
    });

    return itens;
  }

  async findAll() {
    const orders = await this.orderModel.find();

    return {
      orders,
    };
  }
}
