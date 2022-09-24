import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 修改全局路由前缀
  app.setGlobalPrefix('ucs');
  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());
  // 修改全局端口
  await app.listen(2022);
}
bootstrap();
