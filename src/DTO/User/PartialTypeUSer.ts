import { UserDto } from './user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class PartialTypeUser extends PartialType(UserDto) {
  @IsString()
  readonly id: string;
}
