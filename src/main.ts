/**
 * Neo OpenAPI SDK
 */
import axiosFetcher from './utils/axiosFetcher';
import { queryXObjectData } from '$xObject/queryObjectData';
import {
  getEntityTypeList,
  getEntityList,
  createXObject,
  updateXObject,
  getXObject,
  deleteXObject,
  getXObjectDesc,
} from '$xObject/xObjects';

// XObject 实体对象相关的方法
const xObject = {
  query: queryXObjectData,
  getEntityTypeList,
  getEntityList,
  getDesc: getXObjectDesc,
  create: createXObject,
  update: updateXObject,
  get: getXObject,
  delete: deleteXObject,
};

export { axiosFetcher, xObject };
