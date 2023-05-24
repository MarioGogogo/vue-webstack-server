// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportCategory = require('../../../app/controller/category');
import ExportDownFiles = require('../../../app/controller/downFiles');
import ExportHome = require('../../../app/controller/home');
import ExportLinks = require('../../../app/controller/links');
import ExportLogs = require('../../../app/controller/logs');
import ExportReadJson = require('../../../app/controller/readJson');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    category: ExportCategory;
    downFiles: ExportDownFiles;
    home: ExportHome;
    links: ExportLinks;
    logs: ExportLogs;
    readJson: ExportReadJson;
    user: ExportUser;
  }
}
