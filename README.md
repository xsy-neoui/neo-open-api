## Neo OpenAPI SDK 使用文档
Neo OpenAPI SDK 仅支持平台端（NeoCRM）使用，脱离平台需 使用 OAuth安全认证，详细见 [API的使用方法](https://doc.xiaoshouyi.com/?sso-domain=login-cd.xiaoshouyi.com#/proMan/workplaceDetailApi?url=%2F%2Fconcepts%2Fapi_apiUtilizationMethod.html&id=1404&dir=output_1757040838809&time=1759063137723)。
当前主要在 Neo 自定义组件中使用，如何开发 Neo 自定义组件请见 [neo-cmp-cli 使用文档](https://www.npmjs.com/package/neo-cmp-cli)。

## 安装

```
npm install --save neo-open-api
```


## 使用 Neo OpenAPI SDK 提供的请求方法

### 基础请求工具

#### axiosFetcher
基于 axios 封装的通用请求工具，支持 GET、POST、PATCH、DELETE 等请求方法。

```typescript
import { axiosFetcher } from 'neo-open-api';

// 基本用法
const result = await axiosFetcher({
  url: '/api/endpoint',
  method: 'GET',
  data: { key: 'value' },
  headers: { 'Custom-Header': 'value' },
  timeout: 30000
});
```

**参数说明：**
- `url`: 请求地址
- `method`: 请求方法，默认为 'GET'
- `data`: 请求数据，GET 请求会转为 params
- `headers`: 请求头，默认包含 'Content-Type': 'application/json'
- `timeout`: 超时时间，默认 30000ms

### 业务对象相关接口

#### 1. 查询业务对象数据列表
使用通用查询接口获取业务对象数据，支持分页和排序。

```typescript
import { xObject } from 'neo-open-api';

// 基本查询
const result = await xObject.query({
  xObjectApiKey: 'xxObject', // 业务对象 API Key
  fields: ['name', 'phone', 'email'], // 查询字段
  page: 1, // 页码（可选）
  pageSize: 10, // 每页数量（可选）
  orderBy: 'name asc' // 排序条件（可选）
});
```

**参数说明：**
- `xObjectApiKey`: 业务对象的 API Key
- `fields`: 需要查询的字段数组，会自动添加 'id' 字段
- `page`: 页码，默认为 1
- `pageSize`: 每页数量，默认为 10
- `orderBy`: 排序条件，如 'name asc' 或 'createdTime desc'

**返回结果：**
```typescript
{
  status: boolean, // 返回 true 表示执行成功
  code: number, // 返回码
  msg: string, // 一般用于返回错误信息
  totalSize: number, // 总个数
  data: any[] // 查询结果数据
}
```

#### 2. 获取业务类型列表
获取指定业务对象的业务类型列表。

```typescript
import { xObject } from 'neo-open-api';

const result = await xObject.getEntityTypeList('xObjectApiKey', {
  // 其他请求选项
});
```

**参数说明：**
- `xObjectApiKey`: 业务对象的 API Key
- `options`: 可选的请求配置

**返回结果：**
```typescript
{
  status: boolean, // 返回 true 表示执行成功
  code: number, // 返回码
  msg: string, // 一般用于返回错误信息
  totalSize: number, // 总个数
  data: any[] // 查询结果数据
}
```

#### 3. 获取对象列表
获取系统中的对象列表，支持标准对象和自定义对象。

```typescript
import { xObject } from 'neo-open-api';

// 获取所有对象列表
const {data: standardObjects} = await xObject.getEntityList({
  active: true   // 仅获取有权限的对象
});

// 获取标准对象列表
const {data: standardObjects} = await xObject.getEntityList({
  custom: false, // 获取标准对象
  active: true   // 仅获取有权限的对象
});

// 获取自定义对象列表
const {data: customObjects} = await xObject.getEntityList({
  custom: true,  // 获取自定义对象
  active: true   // 仅获取有权限的对象
});
```

**参数说明：**
- `custom`: 是否获取自定义对象，false 为标准对象，true 为自定义对象，不传则获取所有实体对象
- `active`: 是否仅获取有权限的对象，默认为 true

**返回结果：**
```typescript
{
  status: boolean, // 返回 true 表示执行成功
  code: number, // 返回码
  msg: string, // 一般用于返回错误信息
  totalSize: number, // 总个数
  data: any[] // 查询结果数据
}
```

#### 4. 创建业务数据
创建新的业务数据记录。

```typescript
import { xObject } from 'neo-open-api';

const result = await xObject.create('xObjectApiKey', {
  data: {
    name: '张三',
    phone: '13800138000',
    email: 'zhangsan@example.com'
  }
});
```

**参数说明：**
- `xObjectApiKey`: 业务对象的 API Key
- `options.data`: 要创建的数据对象


**返回结果：**
```typescript
{
  status: boolean, // 返回 true 表示执行成功
  code: number, // 返回码
  msg: string, // 一般用于返回错误信息
  totalSize: number, // 总个数
  data: Object // 创建的业务数据
}
```

#### 5. 更新业务数据
更新指定的业务数据记录。

```typescript
import { xObject } from 'neo-open-api';

const result = await xObject.update('xObjectApiKey', 'xObjectId', {
  data: {
    name: '李四',
    phone: '13900139000'
  }
});
```

**参数说明：**
- `xObjectApiKey`: 业务对象的 API Key
- `xObjectId`: 要更新的记录 ID
- `options.data`: 要更新的数据对象

**返回结果：**
```typescript
{
  status: boolean, // 返回 true 表示执行成功
  code: number, // 返回码
  msg: string, // 一般用于返回错误信息
  data: Object // 更新的业务数据
}
```

#### 6. 获取业务数据信息 
获取指定业务数据记录的详细信息。

```typescript
import { xObject } from 'neo-open-api';

const result = await xObject.get('xObjectApiKey', 'xObjectId', {
  // 其他请求选项
});
```

**参数说明：**
- `xObjectApiKey`: 业务对象的 API Key
- `xObjectId`: 要获取的记录 ID
- `options`: 可选的请求配置

**返回结果：**
```typescript
{
  status: boolean, // 返回 true 表示执行成功
  code: number, // 返回码
  msg: string, // 一般用于返回错误信息
  data: Object // 获取的业务数据
}
```

#### 7. 删除业务数据
删除指定的业务数据记录。

```typescript
import { xObject } from 'neo-open-api';

const result = await xObject.delete('xObjectApiKey', 'xObjectId');
```

**参数说明：**
- `xObjectApiKey`: 业务对象的 API Key
- `xObjectId`: 要删除的记录 ID

**返回结果：**
```typescript
{
  status: boolean, // 返回 true 表示执行成功
  code: number, // 返回码
  msg: string, // 一般用于返回错误信息
}
```

#### 8. 获取业务对象描述
获取业务对象的描述信息。

```typescript
import { xObject } from 'neo-open-api';

const result = await xObject.getDesc('xObjectApiKey');
```

**参数说明：**
- `xObjectApiKey`: 业务对象的 API Key

### 使用示例

```typescript
import { xObject } from 'neo-open-api';

// 查询联系人列表
const {data: contacts} = await xObject.query({
  xObjectApiKey: 'xxObject',
  fields: ['name', 'phone', 'email'],
  page: 1,
  pageSize: 20,
  orderBy: 'createdAt desc'
});

// 创建新联系人
const {data: newContact} = await xObject.create('xxObject', {
  data: {
    name: '王五',
    phone: '13700137000',
    email: 'wangwu@example.com'
  }
});

// 更新联系人
const {data: updatedContact} = await xObject.update('xxObject', newContact.id, {
  data: {
    name: '王五（更新）'
  }
});

// 获取联系人详情
const {data: contactDetail} = await xObject.get('xxObject', newContact.id);

// 删除联系人
await xObject.delete('Contact', newContact.id);
```

