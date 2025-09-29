/**
 * Neo OpenAPI SDK
 */
import axiosFetcher from './utils/axiosFetcher';
import { queryXObjectData } from '$xobject/queryObjectData';
import {
  getEntityTypeList,
  getEntityList,
  createXObject,
  updateXObject,
  getXObject,
  deleteXObject,
  getXObjectDesc,
} from '$xobject/xobjects';

// XObject 实体对象相关的方法
const xobject = {
  query: queryXObjectData,
  getEntityTypeList,
  getEntityList,
  getDesc: getXObjectDesc,
  create: createXObject,
  update: updateXObject,
  get: getXObject,
  delete: deleteXObject,
};

export { axiosFetcher, xobject };
