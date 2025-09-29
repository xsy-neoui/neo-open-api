/**
 * 这里存放通用查询类 Open API
 */
export declare const queryXObjectData: (options?: any) => Promise<{
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
export default queryXObjectData;
