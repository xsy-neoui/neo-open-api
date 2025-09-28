import { xobject } from '../src/main';

/**
 * 测试 Neo OpenAPI
 * 备注：Neo OpenAPI SDK 仅支持平台端（NeoCRM）使用。
 * 
 * 【特别说明】本地请使用 linkDebug 命令调试此脚本。
 */
const result1 = await xobject.query({
  xObjectApiKey: 'contact',
  fields: ['name', 'phone', 'email'],
});
console.log('result:', result1);
