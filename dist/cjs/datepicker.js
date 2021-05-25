'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-14c82365.js');
require('./helpers.js');
require('./chunk-1bb51959.js');
require('./chunk-57f5c80a.js');
require('./chunk-79c6311f.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-f109d9f0.js');
require('./chunk-0710a23f.js');
require('./chunk-ae7e641a.js');
require('./chunk-2e705bda.js');
require('./chunk-eeae87c4.js');
require('./chunk-dff41ded.js');
var __chunk_16 = require('./chunk-2db97dd6.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_16.Datepicker);
  }
};
__chunk_5.use(Plugin);

exports.BDatepicker = __chunk_16.Datepicker;
exports.default = Plugin;
