import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}
  async hashToken(token: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(token, salt);
  }
  async create(userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashToken(userDTO.password);
    const newUser = new this.model({ ...userDTO, password: hash });
    return await newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IUser> {
    return await this.model.findOne({ _id: id });
  }

  async update(id: string, userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashToken(userDTO.password);
    return await this.model.findOneAndUpdate(
      { _id: id },
      { ...userDTO, password: hash },
      { new: true },
    );
  }

  async remove(id: string) {
    await this.model.deleteOne({ _id: id });
    return { status: HttpStatus.OK, msg: 'Deleted' };
  }

  async findByUsername(username: string): Promise<IUser> {
    return await this.model.findOne({ username });
  }

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }
}
