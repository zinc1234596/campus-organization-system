import * as nodemailer from 'nodemailer';
import { getConfig } from '@/utils/index';
import { compile } from 'handlebars';
import * as mjml2html from 'mjml';
import { EMAIL_VERIFY_TEMPLATE } from '@/common/constants/emailTemplate.constants';
const { EMAIL_CONFIG } = getConfig();
/**
 * 生成验证码
 */
const randomCode = (): string => {
  let verifyCode: string = '';
  for (let i = 0; i < 6; i++) {
    verifyCode += `${Math.floor(Math.random() * 10)}`;
  }
  return verifyCode;
};

/**
 * 验证邮箱正则
 * @param email
 */
const verifyRegEmail = (email: string): boolean => {
  const rule =
    /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  return rule.test(email);
};

/**
 * 生成响应式邮件html
 * @param email
 * @param code
 */
const emailTemplate = (email: string, code: string) => {
  const context = { email, code };
  const escapeTemplate = compile(EMAIL_VERIFY_TEMPLATE)(context);
  return mjml2html(escapeTemplate).html;
};

/**
 * 发送验证码
 * @param email
 */
export const sendVerifyCodeEmail = async (email: string) => {
  const code = randomCode();
  const html = emailTemplate(email, code);
  if (!verifyRegEmail(email)) {
    return '邮箱格式不对';
  }
  const transporter = nodemailer.createTransport({
    ...EMAIL_CONFIG,
  });
  const mailOptions = {
    from: EMAIL_CONFIG.auth.user,
    to: `${email}`,
    subject: `Your VerifyCode:${code}`,
    html,
  };
  try {
    const res = await transporter.sendMail(mailOptions);
    return { res: res.response, code };
  } catch (err) {
    return err;
  }
};
