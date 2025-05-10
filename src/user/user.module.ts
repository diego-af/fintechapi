import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RepositoryService } from '../repository/User/repository.service';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../AuthGuards/auth.guard';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, RepositoryService, AuthGuard],
})
export class UserModule {}
