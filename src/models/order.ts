import { Schema, Document, model } from 'mongoose';
import { IOrder } from '../interfaces/IOrder';

const orderSchema = new Schema({
  pipedriveId: {
    type: Number,
    required: true,
    index: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  totalValue: {
    type: Number,
    required: true,
  },
});

export default model<IOrder & Document>('Order', orderSchema);
