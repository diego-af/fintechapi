import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionRepository } from '../repository/Transaction/transaction.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionRepository, PrismaService],
})
export class TransactionsModule {}
