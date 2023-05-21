// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportCheckParam = require('../../../app/middleware/checkParam');
import ExportGzip = require('../../../app/middleware/gzip');
import ExportParamsErr = require('../../../app/middleware/paramsErr');

declare module 'egg' {
  interface IMiddleware {
    checkParam: typeof ExportCheckParam;
    gzip: typeof ExportGzip;
    paramsErr: typeof ExportParamsErr;
  }
}
