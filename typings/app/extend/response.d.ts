// This file is created by egg-ts-helper@1.34.7
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExtendResponse = require('../../../app/extend/response');
type ExtendResponseType = typeof ExtendResponse;
declare module 'egg' {
  interface Response extends ExtendResponseType { }
}