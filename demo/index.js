import { xObject } from '../src/main';

/**
 * 测试 Neo OpenAPI
 * 备注：Neo OpenAPI SDK 仅支持平台端（NeoCRM）使用。
 * 
 * 【特别说明】本地请使用 linkDebug 命令调试此脚本。
 */
/*
// 查询业务对象数据列表
const result1 = await xObject.query({
  xObjectApiKey: 'account',
  fields: ['accountName', 'phone'],
});
console.log('result1:', result1);
*/

// 获取业务类型列表
/*
const result2 = await xObject.getEntityTypeList('account');
console.log('result2:', result2);
*/

// 获取对象列表
/*
const result3 = await xObject.getEntityList({
  custom: false,
  active: true,
});
console.log('result3:', result3);
*/

// 创建业务数据
/*
const result4 = await xObject.create('customContact__c', {
  data: {
    name: 'wibetter',
    phone__c: '15900000003',
    entityType: 3998003734470119
  },
});
console.log('result4:', result4);
*/

// 更新业务数据
/*
const result5 = await xObject.update('customContact__c', 4003463613111893, {
  data: {
    name: 'wibetter123',
    phone__c: '15910000003',
    entityType: 3998003734470119
  },
});
console.log('result5:', result5);
*/

// 获取业务数据
/*
const result6 = await xObject.get('customContact__c', 4003463613111893);
console.log('result6:', result6);
*/

// 删除业务数据
/*
const result7 = await xObject.delete('customContact__c', 4003463613111893);
console.log('result7:', result7);
*/

// 获取对象描述
const result8 = await xObject.getDesc('customContact__c1');
console.log('result8:', result8);
