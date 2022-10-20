// 处理业务运行中预知且主动抛出的异常
import { HttpException, HttpStatus } from '@nestjs/common';
import { BUSINESS_ERROR_CODE } from '@/common/constants/business.error.codes.constants';

type BusinessError = {
  code: number;
  message: string;
};
export class BusinessException extends HttpException {
  constructor(err: BusinessError | string) {
    if (typeof err === 'string') {
      err = {
        code: BUSINESS_ERROR_CODE.COMMON,
        message: err,
      };
    }
    super(err, HttpStatus.OK);
  }

  static throwForbidden() {
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.ACCESS_FORBIDDEN,
      message: '无此权限！',
    });
  }

  static throwEmailOrPasswordError() {
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.EMAIL_OR_PASSWORD_ERROR,
      message: '邮箱或密码错误',
    });
  }

  static throwEmailAlreadyExistError() {
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.EMAIL_ALREADY_EXIST,
      message: '邮箱已经存在',
    });
  }

  static throwEmailCodeError() {
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.EMAIL_CODE_ERROR,
      message: '验证码错误',
    });
  }
}
