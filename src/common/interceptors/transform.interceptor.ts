import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// 响应统一interface
interface Response<T> {
  data: T;
}

@Injectable()
// 转换拦截器类
// implements:https://blog.csdn.net/weixin_49343253/article/details/123425046
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext, // 执行上下午
    next: CallHandler, // next处理
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        data, // 数据
        status: 0, // 接口状态值
        message: 'success', // 异常信息
        success: true, // 接口业务返回状态
      })),
    );
  }
}
