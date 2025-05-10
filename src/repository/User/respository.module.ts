import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { RepositoryService } from './repository.service';


@Module({
  providers: [RepositoryService],
  imports: [PrismaModule],
})
export class RespositoryModule {}
