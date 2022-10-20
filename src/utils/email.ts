import * as nodemailer from 'nodemailer';
import { getConfig } from '@/utils/index';
const { EMAIL_CONFIG } = getConfig();
/**
 * 生成验证码
 */
const randomCode = () => {
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
const verifyRegEmail = (email: string) => {
  const rule =
    /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  return rule.test(email);
};
/**
 * 发送验证码
 * @param email
 */
export const sendVerifyCodeEmail = async (email: string) => {
  if (!verifyRegEmail(email)) {
    return '邮箱格式不对';
  }
  const transporter = nodemailer.createTransport({
    ...EMAIL_CONFIG,
  });
  const mailOptions = {
    from: EMAIL_CONFIG.auth.user,
    to: `${email}`,
    subject: '你的验证码来了',
    html: `${randomCode()}`,
  };
  const res = await transporter.sendMail(mailOptions);
  return res.response;
};
