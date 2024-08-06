import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class PaymentDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly url: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly token_secret: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly enabled: boolean;
}
