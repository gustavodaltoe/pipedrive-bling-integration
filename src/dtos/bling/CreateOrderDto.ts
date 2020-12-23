/* eslint-disable camelcase */
export default interface CreateOrderDto {
  numero: string;
  data: string;
  cliente: {
    numero: string;
    nome: string;
    fone: string;
    email: string;
  };
  itens: [
    {
      codigo: string;
      descricao: string;
      qtde: number;
      vlr_unit: number;
    },
  ];
}
