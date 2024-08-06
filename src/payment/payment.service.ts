import { HttpStatus, Injectable } from '@nestjs/common';
import { PaymentDTO } from './dto/payment.dto';
import { IPayment } from 'src/common/interfaces/payment.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { PAYMENT } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(PAYMENT.name) private readonly model: Model<IPayment>,
  ) {}
  async hashToken(token: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(token, salt);
  }
  async create(paymentDTO: PaymentDTO): Promise<IPayment> {
    const hash = await this.hashToken(paymentDTO.token_secret);
    const newPayment = new this.model({ ...paymentDTO, token_secret: hash });
    return await newPayment.save();
  }

  async findAll(): Promise<IPayment[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IPayment> {
    return await this.model.findOne({ _id: id });
  }

  async update(id: string, paymentDTO: PaymentDTO): Promise<IPayment> {
    const hash = await this.hashToken(paymentDTO.token_secret);
    return await this.model.findOneAndUpdate(
      { _id: id },
      { ...paymentDTO, token_secret: hash },
      { new: true },
    );
  }

  async remove(id: string) {
    await this.model.deleteOne({ _id: id });
    return { status: HttpStatus.OK, msg: 'Deleted' };
  }
}
