import axios from 'axios';

// 创建基于 axios 的 fetcher 函数
const axiosFetcher = async (options) => {
    try {
        const config = {
            ...options,
            method: options?.method || 'GET',
            data: options?.data || {},
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            timeout: options?.timeout || 30000,
        };
        if (config?.method === 'GET') {
            config.params = options?.data || {};
        }
        const response = await axios(config);
        return response?.data || {};
    }
    catch (error) {
        if (error.response) {
            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
            console.error('接口请求报错 / 接口服务异常：', error.message);
        }
        else if (error.request) {
            // 请求已经成功发起，但没有收到响应
            console.error('接口请求报错 / 接口未正常响应：', error.message);
        }
        else {
            console.error('接口请求报错:', error, '，请求参数:', options);
        }
        throw error;
    }
};

/**
 * 这里存放通用查询类 Open API
 */
// 获取业务对象数据列表
const queryXObjectData = async (options) => {
    const apiUrl = '/rest/data/v2/query';
    const curOptions = options || {};
    const xObjectApiKey = curOptions.xObjectApiKey || '';
    const fields = Object.assign([], curOptions.fields || []);
    const page = curOptions.page || 1;
    const pageSize = curOptions.pageSize || 10;
    // 自动添加 objectId 字段
    if (!fields.includes('id')) {
        fields.push('id');
    }
    // 计算分页偏移量
    const offset = (page - 1) * pageSize;
    // 构建 SQL 查询
    let querySql = `select ${fields.join(',')} from ${xObjectApiKey}`;
    // 添加排序条件（如果有的话）
    if (curOptions.orderBy) {
        querySql += ` order by ${curOptions.orderBy}`;
    }
    if (curOptions.page || curOptions.pageSize) {
        // 添加分页限制
        querySql += ` limit ${offset},${pageSize}`;
    }
    try {
        const config = {
            url: apiUrl,
            method: 'GET',
            data: {
                q: querySql,
            },
        };
        const resultData = await axiosFetcher(config);
        if (resultData.code === 200) {
            const { records, totalSize } = resultData.result || {};
            return {
                status: true,
                code: resultData.code,
                msg: resultData.msg || '获取业务对象数据列表成功',
                totalSize,
                data: records || [],
            };
        }
        return {
            status: false,
            code: resultData.code,
            msg: resultData.msg || '获取业务对象数据列表失败',
            data: [],
        };
    }
    catch (error) {
        console.error('获取业务对象数据列表失败:', error);
        return {
            status: false,
            msg: error.msg || error.message || '获取业务对象数据列表失败',
            data: [],
        };
    }
};

// 获取业务类型列表
const getEntityTypeList = async (xObjectApiKey, options) => {
    const curOptions = options || {};
    const apiUrl = `/rest/data/v2.0/xobjects/${xObjectApiKey}/busiType`;
    try {
        const config = {
            ...curOptions,
            url: apiUrl,
            method: 'GET',
        };
        const resultData = await axiosFetcher(config);
        if (resultData.code === 200 || resultData.code === '200') {
            const { records, totalSize } = resultData.data || {};
            return {
                status: true,
                code: resultData.code,
                msg: resultData.msg || '获取业务类型列表成功',
                totalSize,
                data: records || [],
            };
        }
        return {
            status: false,
            code: resultData.code,
            msg: resultData.msg || '获取业务类型列表失败',
            data: [],
        };
    }
    catch (error) {
        console.error('获取业务类型列表失败:', error);
        return {
            status: false,
            msg: error.msg || error.message || '获取业务类型列表失败',
            data: [],
        };
    }
};
// 获取对象列表
const getEntityList = async (options) => {
    const curOptions = options || {};
    const active = curOptions.active ?? true; // 仅获取有权限的对象
    const custom = curOptions.custom; // 默认获取标准对象列表
    let apiUrl = `/rest/metadata/v2.0/xobjects/filter?active=${active}`;
    if (custom !== undefined) {
        apiUrl = `/rest/metadata/v2.0/xobjects/filter?custom=${custom}&active=${active}`;
    }
    try {
        const config = {
            ...curOptions,
            url: apiUrl,
            method: 'GET',
        };
        const resultData = await axiosFetcher(config);
        if (resultData.code === '0' ||
            resultData.code === 0 ||
            resultData.code === '200' ||
            resultData.code === 200) {
            const { records, totalSize } = resultData.data || {};
            return {
                status: true,
                code: resultData.code,
                msg: resultData.msg || '获取对象列表成功',
                totalSize,
                data: records || [],
            };
        }
        return {
            status: false,
            code: resultData.code,
            msg: resultData.msg || '获取对象列表失败',
            data: [],
        };
    }
    catch (error) {
        console.error('获取对象列表失败:', error);
        return {
            status: false,
            msg: error.msg || error.message || '获取对象列表失败',
            data: [],
        };
    }
};
// 创建业务数据
const createXObject = async (xObjectApiKey, options) => {
    const curOptions = options || {};
    const apiUrl = `/rest/data/v2.0/xobjects/${xObjectApiKey}`;
    const formData = curOptions.data || {};
    try {
        const config = {
            ...options,
            url: apiUrl,
            method: curOptions.method || 'POST',
            data: {
                data: formData,
            },
        };
        const resultData = await axiosFetcher(config);
        if (resultData.code === '200' || resultData.code === 200) {
            return {
                status: true,
                code: resultData.code,
                msg: resultData.msg || '创建业务数据成功',
                data: resultData.data || {},
            };
        }
        return {
            status: false,
            code: resultData.code,
            msg: resultData.msg || '创建业务数据失败',
            data: {},
        };
    }
    catch (error) {
        console.error('创建业务数据失败:', error);
        return {
            status: false,
            msg: error.msg || error.message || '创建业务数据失败',
            data: {},
        };
    }
};
// 更新业务数据
const updateXObject = async (xObjectApiKey, objectId, options) => {
    const curOptions = options || {};
    const apiUrl = `/rest/data/v2.0/xobjects/${xObjectApiKey}/${objectId}`;
    const formData = curOptions.data || {};
    try {
        const config = {
            ...curOptions,
            url: apiUrl,
            method: curOptions.method || 'PATCH',
            data: {
                data: formData,
            },
        };
        const resultData = await axiosFetcher(config);
        if (resultData.code === '200' || resultData.code === 200) {
            return {
                status: true,
                code: resultData.code,
                msg: resultData.msg || '更新业务数据成功',
                data: resultData.data || {},
            };
        }
        return {
            status: false,
            code: resultData.code,
            msg: resultData.msg || '更新业务数据失败',
            data: {},
        };
    }
    catch (error) {
        console.error('更新业务数据失败:', error);
        return {
            status: false,
            msg: error.msg || error.message || '更新业务数据失败',
            data: {},
        };
    }
};
// 获取业务数据详情信息
const getXObject = async (xObjectApiKey, objectId, options) => {
    let curXObjectApiKey = xObjectApiKey;
    let curObjectId = objectId;
    let curOptions = options || {};
    if (typeof xObjectApiKey === 'object' && xObjectApiKey.xObjectApiKey) {
        curOptions = xObjectApiKey.options || {};
        curObjectId = xObjectApiKey.objectId;
        curXObjectApiKey = xObjectApiKey.xObjectApiKey;
    }
    const apiUrl = `/rest/data/v2.0/xobjects/${curXObjectApiKey}/${curObjectId}`;
    try {
        const config = {
            ...curOptions,
            url: apiUrl,
            method: curOptions.method || 'GET',
        };
        const resultData = await axiosFetcher(config);
        if (resultData.code === '200' || resultData.code === 200) {
            return {
                status: true,
                code: resultData.code,
                msg: resultData.msg || '获取业务数据成功',
                data: resultData.data || {},
            };
        }
        return {
            status: false,
            code: resultData.code,
            msg: resultData.msg || '获取业务数据失败',
            data: {},
        };
    }
    catch (error) {
        console.error('获取业务数据失败:', error);
        return {
            status: false,
            msg: error.msg || error.message || '获取业务数据失败',
            data: {},
        };
    }
};
// 删除业务数据
const deleteXObject = async (xObjectApiKey, objectId, options) => {
    const curOptions = options || {};
    const apiUrl = `/rest/data/v2.0/xobjects/${xObjectApiKey}/${objectId}`;
    try {
        const config = {
            ...curOptions,
            url: apiUrl,
            method: curOptions.method || 'DELETE',
        };
        const resultData = await axiosFetcher(config);
        if (resultData.code === '200' || resultData.code === 200) {
            return {
                status: true,
                code: resultData.code,
                msg: resultData.msg || '删除业务数据成功',
            };
        }
        return {
            status: false,
            code: resultData.code,
            msg: resultData.msg || '删除业务数据失败',
        };
    }
    catch (error) {
        console.error('删除业务数据失败:', error);
        return {
            status: false,
            msg: error.msg || error.message || '删除业务数据失败',
        };
    }
};
// 获取业务对象描述
const getXObjectDesc = async (xObjectApiKey, options) => {
    const curOptions = options || {};
    const apiUrl = `/rest/data/v2.0/xobjects/${xObjectApiKey}/description`;
    try {
        const config = {
            ...options,
            url: apiUrl,
            method: curOptions.method || 'GET',
        };
        const resultData = await axiosFetcher(config);
        if (resultData.code === '200' || resultData.code === 200) {
            return {
                status: true,
                code: resultData.code,
                msg: resultData.msg || '获取业务对象描述数据成功',
                data: resultData.data || {},
            };
        }
        return {
            status: false,
            code: resultData.code,
            msg: resultData.msg || '获取业务对象描述数据失败',
            data: {},
        };
    }
    catch (error) {
        console.error('获取业务对象描述数据失败:', error);
        return {
            status: false,
            msg: error.msg || error.message || '获取业务对象描述数据失败',
            data: {},
        };
    }
};

// 获取自定义API列表
const getCustomApiList = async (options) => {
    const curOptions = options || {};
    const pageNo = curOptions.pageNo || 1;
    const pageSize = curOptions.pageSize || 1000;
    const apiUrl = `/rest/metadata/v2.0/dx/logic/extpoints/openapi?pageNo=${pageNo}&pageSize=${pageSize}`;
    try {
        const config = {
            url: apiUrl,
            method: 'GET',
        };
        const resultData = await axiosFetcher(config);
        if (resultData.code === '0' ||
            resultData.code === 0 ||
            resultData.code === '200' ||
            resultData.code === 200) {
            const { items, count } = resultData.data || {};
            return {
                status: true,
                code: resultData.code,
                msg: resultData.msg || '获取自定义API列表成功',
                totalSize: count,
                data: items || [],
            };
        }
        return {
            status: false,
            code: resultData.code,
            msg: resultData.msg || '获取自定义API列表失败',
            data: [],
        };
    }
    catch (error) {
        console.error('获取自定义API列表失败:', error);
        return {
            status: false,
            msg: error.msg || error.message || '获取自定义API列表失败',
            data: [],
        };
    }
};
/**
 * 执行指定自定义API
 *
 * @param options 请求参数
 * @param options.apiUrl 自定义API地址
 * @param options.methodType 请求方法
 * @param options.data 请求数据
 *
 * @returns 执行结果
 */
const runCustomApi = async (options) => {
    const curOptions = options || {};
    const apiUrl = curOptions.apiUrl || '';
    const method = curOptions.methodType || curOptions.method || 'POST';
    const formData = curOptions.data || {};
    try {
        const config = {
            ...options,
            url: apiUrl,
            method,
            data: formData
        };
        const resultData = await axiosFetcher(config);
        return {
            status: true,
            ...resultData
        };
    }
    catch (error) {
        console.error('执行自定义API失败:', error);
        return {
            status: false,
            msg: error.msg || error.message || '执行自定义API失败',
            data: {}
        };
    }
};

/**
 * Neo OpenAPI SDK
 */
// XObject 实体对象相关的方法
const xObject = {
    query: queryXObjectData,
    getEntityTypeList,
    getEntityList,
    getDesc: getXObjectDesc,
    create: createXObject,
    update: updateXObject,
    get: getXObject,
    delete: deleteXObject
};
// Custom API 自定义API相关的方法
const customApi = {
    getList: getCustomApiList,
    run: runCustomApi
};

export { axiosFetcher, customApi, xObject };
