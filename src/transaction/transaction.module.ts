import { Module } from '@nestjs/common';
import { UserController } from 'src/user/user.controller';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [ UserController ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
