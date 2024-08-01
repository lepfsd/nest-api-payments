import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentController } from './payment/payment.controller';

@Module({
  imports: [],
  controllers: [AppController, PaymentController],
  providers: [AppService],
})
export class AppModule {}
