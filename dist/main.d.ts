/**
 * Neo OpenAPI SDK
 */
import axiosFetcher from './utils/axiosFetcher';
declare const xObject: {
    query: (options?: any) => Promise<{
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
    getEntityTypeList: (xObjectApiKey: string, options?: any) => Promise<{
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
    getEntityList: (options?: any) => Promise<{
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
    getDesc: (xObjectApiKey: string, options?: any) => Promise<{
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
    create: (xObjectApiKey: string, options: any) => Promise<{
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
    update: (xObjectApiKey: string, objectId: string, options: any) => Promise<{
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
    get: (xObjectApiKey: string, objectId: string, options?: any) => Promise<{
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
    delete: (xObjectApiKey: string, objectId: string, options?: any) => Promise<{
        status: boolean;
        code: any;
        msg: any;
    } | {
        status: boolean;
        msg: any;
        code?: undefined;
    }>;
};
export { axiosFetcher, xObject };
