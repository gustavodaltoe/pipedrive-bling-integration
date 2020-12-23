import { Document } from 'mongoose';

export interface IOrder extends Document {
  pipedriveId: number;
  date: Date;
  totalValue: number;
}
