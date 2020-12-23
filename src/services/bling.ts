import { AxiosInstance } from 'axios';
import { Inject, Service } from 'typedi';
import * as js2xmlparser from 'js2xmlparser';
import CreateOrderDto from '../dtos/bling/CreateOrderDto';

@Service()
export default class BlingService {
  constructor(
    @Inject('blingApi')
    private api: AxiosInstance,
  ) {}

  async createOrder(order: CreateOrderDto): Promise<any> {
    const { cliente, itens, data, numero } = order;

    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <pedido>
        <numero>${numero}</numero>
        <data>${data}</data>
        <cliente>
          <nome>${cliente.nome}</nome>
          <fone>${cliente.fone}</fone>
          <email>${cliente.email}</email>
        </cliente>
        <itens>
          ${itens.map(item => {
            return `
              <item>
                <codigo>${item.codigo}</codigo>
                <descricao>${item.descricao}</descricao>
                <qtde>${item.qtde}</qtde>
                <vlr_unit>${item.vlr_unit}</vlr_unit>
              </item>
            `;
          })}
        </itens>
      </pedido>
    `;

    return this.api.post('/pedido/json/', null, { params: { xml } });
  }
}
