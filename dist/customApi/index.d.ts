export declare const getCustomApiList: (options?: any) => Promise<{
    status: boolean;
    code: any;
    msg: any;
    totalSize: any;
    data: any;
} | {
    status: boolean;
    code: any;
    msg: any;
    data: never[];
    totalSize?: undefined;
} | {
    status: boolean;
    msg: any;
    data: never[];
    code?: undefined;
    totalSize?: undefined;
}>;
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
export declare const runCustomApi: (options: any) => Promise<any>;
