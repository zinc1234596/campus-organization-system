import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './utils';
import { DatabaseModule } from '@/common/database/database.module';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      // 禁用默认读取 .env 的规则
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
