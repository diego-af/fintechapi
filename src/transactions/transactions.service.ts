import { HttpException, Inject, Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repository/Transaction/transaction.service';
import { TransactionDto } from '../DTO/Transactions/transactions.dto';

@Injectable()
export class TransactionsService {
  @Inject()
  private readonly transactionRepository: TransactionRepository;

  async createTransaction(data: TransactionDto, userId: string) {
    const transaction = await this.transactionRepository.createTransaction(
      data,
      userId,
    );
    return transaction;
  }

  async getAllTransactions(userId: string) {
    const transactions =
      await this.transactionRepository.getAllTransactions(userId);
    return transactions;
  }

  async updatedServiceTransaction(data: TransactionDto, id: string) {
    const transactionExists =
      await this.transactionRepository.getTranactionById(id);

    if (!transactionExists) {
      throw new HttpException('Transaction not found', 404);
    }

    const transactionUpdated =
      await this.transactionRepository.updatedTranaction(data, id);

    return transactionUpdated;
  }


  async deleteTransaction(id: string, userId: string) {

    const transactionsExists = await this.transactionRepository.getTranactionById(id)


    if(!transactionsExists){
      throw new HttpException('Transaction not found', 404);
    }

    const belongToUser = await this.transactionRepository.belongToTransactionuser(userId);


    if(!belongToUser){
      throw new HttpException('Transaction not to belong user', 401);
    }


    const transactionDeleted = await this.transactionRepository.deleteTransaction(id)



    return transactionDeleted
  }
}
