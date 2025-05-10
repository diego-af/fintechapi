import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [UserModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
