export declare const getEntityTypeList: (xObjectApiKey: string, options?: any) => Promise<{
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
export declare const getEntityList: (options?: any) => Promise<{
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
export declare const createXObject: (xObjectApiKey: string, options: any) => Promise<{
    status: boolean;
    code: any;
    msg: any;
    data: any;
} | {
    status: boolean;
    msg: any;
    data: {};
    code?: undefined;
}>;
export declare const updateXObject: (xObjectApiKey: string, objectId: string, options: any) => Promise<{
    status: boolean;
    code: any;
    msg: any;
    data: any;
} | {
    status: boolean;
    msg: any;
    data: {};
    code?: undefined;
}>;
export declare const getXObject: (xObjectApiKey: string, objectId: string, options?: any) => Promise<{
    status: boolean;
    code: any;
    msg: any;
    data: any;
} | {
    status: boolean;
    msg: any;
    data: {};
    code?: undefined;
}>;
export declare const deleteXObject: (xObjectApiKey: string, objectId: string, options?: any) => Promise<{
    status: boolean;
    code: any;
    msg: any;
} | {
    status: boolean;
    msg: any;
    code?: undefined;
}>;
export declare const getXObjectDesc: (xObjectApiKey: string, options?: any) => Promise<{
    status: boolean;
    code: any;
    msg: any;
    data: any;
} | {
    status: boolean;
    msg: any;
    data: {};
    code?: undefined;
}>;
