import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { TransactionRepository } from './transaction.service';

@Module({
  providers: [TransactionRepository],
  imports: [PrismaModule],
  exports: [TransactionRepository],
})
export class TransactionModule {}
