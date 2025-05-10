import { IsBoolean, IsNumber, IsString, MinLength } from 'class-validator';

export class TransactionDto {
  @IsNumber()
  amount: number;

  @IsString({
    message: 'Description must be a string',
  })
  @MinLength(3, {
    message: 'Description must be at least 3 characters long',
  })
  description: string;

  @IsBoolean()
  reccurring: boolean;

  @IsString()
  type: string;
}
