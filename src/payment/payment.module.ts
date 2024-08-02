import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PAYMENT } from 'src/common/models/models';
import { PaymentSchema } from './schema/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PAYMENT.name,
        useFactory: () => {
          return PaymentSchema;
        },
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
