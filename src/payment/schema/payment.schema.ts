import * as mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    token_secret: {
      type: String,
      required: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

PaymentSchema.index({ name: 1 }, { unique: true });
