import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [UserModule, TransactionModule],
})
export class AppModule {}
