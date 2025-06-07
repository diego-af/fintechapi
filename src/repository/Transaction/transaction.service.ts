import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TransactionDto } from '../../DTO/Transactions/transactions.dto';

@Injectable()
export class TransactionRepository {
  @Inject()
  private readonly prisma: PrismaService;

  async createTransaction(data: TransactionDto, userId: string) {
    const transaction = await this.prisma.transaction.create({
      data: {
        amount: data.amount,
        description: data.description,
        userId: userId,
        reccurring: data.reccurring,
      },
    });

    return transaction;
  }

  async getAllTransactions(userId: string) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId: userId,
      },
    });

    return transactions;
  }

  async updatedTranaction(data: TransactionDto, id: string) {
    const tranactionUpodated = await this.prisma.transaction.update({
      where: {
        id: id,
      },
      data: {
        amount: data.amount,
        description: data.description,
        reccurring: data.reccurring,
        type: data.type,
      },
    });

    return tranactionUpodated;
  }

  async getTranactionById(id: string) {
    const transactionExists = await this.prisma.transaction.findFirst({
      where: {
        id: id,
      },
    });

    return transactionExists;
  }


  async deleteTransaction(id: string) {
   const deletedTransaction = await this.prisma.transaction.delete({

     where:{
       id:id
     }
   })


    return deletedTransaction


  }


  async belongToTransactionuser(userId: string){

    const transaction = await this.prisma.transaction.findFirst({
      where:{
        userId:userId
      },
      include:{
        user:true
      }
    })


    return transaction
  }
}
