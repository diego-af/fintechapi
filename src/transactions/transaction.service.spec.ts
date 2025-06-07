import { TransactionsService } from './transactions.service';
import { TransactionRepository } from '../repository/Transaction/transaction.service';
import { Test, TestingModule } from '@nestjs/testing';


describe("Tranactions servivce", ()=>{
  let transactionService:TransactionsService
  let transactionRepository:TransactionRepository



  beforeEach(async()=>{

    const module:TestingModule =  await Test.createTestingModule({
      providers:[
        TransactionsService,
        {
          provide:TransactionRepository,
          useValue:{

          }
        }
      ]
    }).compile()


    transactionService = module.get<TransactionsService>(TransactionsService)
    transactionRepository = module.get<TransactionRepository>(TransactionRepository)
  })



  it("should defined", ()=>{
    expect(transactionService).toBeDefined()
    expect(transactionRepository).toBeDefined()
  })

})