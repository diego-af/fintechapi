import {
  Body,
  Controller, Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from '../DTO/Transactions/transactions.dto';
import { AuthGuard } from '../AuthGuards/auth.guard';
import { response } from 'express';

@Controller()
export class TransactionsController {
  @Inject()
  private readonly transactionsService: TransactionsService;

  @UseGuards(AuthGuard)
  @Post('transactions')
  async handleCreateTransaction(
    @Body() data: TransactionDto,
    @Req() req: Request,
  ) {
    const userId = (req['user'] as { sub: string }).sub;

    const transaction = await this.transactionsService.createTransaction(
      data,
      userId,
    );

    return transaction;
  }

  @UseGuards(AuthGuard)
  @Get('transactions')
  async GetAllTransactions(@Req() req: Request) {
    const userId = (req['user'] as { sub: string }).sub;

    const transactions =
      await this.transactionsService.getAllTransactions(userId);

    return transactions;
  }

  @Put('transactions/:id')
  async handleUpdateTransaction(
    @Param('id') id: string,
    @Body() data: TransactionDto,
  ) {
    const transactionUpdated =
      await this.transactionsService.updatedServiceTransaction(data, id);

    return {
      message: 'Transaction updated successfully',
      transaction: transactionUpdated,
    };
  }

  @UseGuards(AuthGuard)
  @Delete("transactions/:id")
  async deleteTransactionController(@Param("id") id: string, @Req() req: Request){
    const userId = (req['user'] as { sub: string }).sub;
    const transactiondDeleted = await this.transactionsService.deleteTransaction(id, userId)


    return {
      message:"Transaction deleted successfully",
      transactiondDeleted

    }

  }
}
