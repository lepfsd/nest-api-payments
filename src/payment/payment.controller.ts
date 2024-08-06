import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PaymentDTO } from './dto/payment.dto';
import { PaymentService } from './payment.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('api/v1/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post()
  create(@Body() paymentDTO: PaymentDTO) {
    return this.paymentService.create(paymentDTO);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() paymentDTO: PaymentDTO) {
    return this.paymentService.update(id, paymentDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
