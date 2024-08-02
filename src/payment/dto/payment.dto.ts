import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class PaymentDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly url: string;
  @IsNotEmpty()
  @IsString()
  readonly token_secret: string;
  @IsNotEmpty()
  @IsBoolean()
  readonly enabled: boolean;
}
