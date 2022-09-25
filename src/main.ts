import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // HMR热重载
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  // 修改全局路由前缀
  app.setGlobalPrefix('ucs');
  // 统一响应体格式
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  // 修改全局端口
  await app.listen(2022);
}
bootstrap();
