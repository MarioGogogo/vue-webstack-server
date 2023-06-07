// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportActionLogs = require('../../../app/model/action-logs');
import ExportCategory = require('../../../app/model/category');
import ExportErrorLogs = require('../../../app/model/error-logs');
import ExportLinks = require('../../../app/model/links');
import ExportLoginLogs = require('../../../app/model/login-logs');
import ExportLogs = require('../../../app/model/logs');
import ExportPerformanceLogs = require('../../../app/model/performance-logs');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    ActionLogs: ReturnType<typeof ExportActionLogs>;
    Category: ReturnType<typeof ExportCategory>;
    ErrorLogs: ReturnType<typeof ExportErrorLogs>;
    Links: ReturnType<typeof ExportLinks>;
    LoginLogs: ReturnType<typeof ExportLoginLogs>;
    Logs: ReturnType<typeof ExportLogs>;
    PerformanceLogs: ReturnType<typeof ExportPerformanceLogs>;
    User: ReturnType<typeof ExportUser>;
  }
}
