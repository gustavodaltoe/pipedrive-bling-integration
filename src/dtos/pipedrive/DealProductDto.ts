/* eslint-disable camelcase */
export default interface DealProductDto {
  id: number;
  deal_id: number;
  product_id: number;
  item_price: number;
  sum_no_discount: number;
  sum: number;
  name: string;
  quantity: number;
  discount_percentage: number;
}
