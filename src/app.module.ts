import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule, 
    TransactionModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'omni-app.database.windows.net',
      port: 1433,
      username: process.env.DB_ADMIN_USER,
      password: process.env.DB_ADMIN_PASSWORD,
      database: 'bank-simulation',
      extra: {
        encrypt: true,                   
        trustServerCertificate: true,       
      },
      entities: [UserEntity],
      synchronize: true, 
    }),
  ],
})
export class AppModule {}
