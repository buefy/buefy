'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-14c82365.js');
require('./helpers.js');
require('./chunk-1bb51959.js');
require('./chunk-79c6311f.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_23 = require('./chunk-aacc804f.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_23.Pagination);
    __chunk_5.registerComponent(Vue, __chunk_23.PaginationButton);
  }
};
__chunk_5.use(Plugin);

exports.BPagination = __chunk_23.Pagination;
exports.BPaginationButton = __chunk_23.PaginationButton;
exports.default = Plugin;
