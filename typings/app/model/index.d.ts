// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportCategory = require('../../../app/model/category');
import ExportLinks = require('../../../app/model/links');
import ExportLogs = require('../../../app/model/logs');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Category: ReturnType<typeof ExportCategory>;
    Links: ReturnType<typeof ExportLinks>;
    Logs: ReturnType<typeof ExportLogs>;
    User: ReturnType<typeof ExportUser>;
  }
}
