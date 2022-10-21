import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'yaml';

/**
 * 获取环境变量
 */
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

/**
 * 读取项目配置
 */
export const getConfig = () => {
  const environment = getEnv();
  const yamlPath = path.join(process.cwd(), `./config/${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  return config;
};
