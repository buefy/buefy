import './chunk-1fafdf15.js';
import './helpers.js';
import './chunk-953eb524.js';
import './chunk-2fd9d737.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import { P as Pagination, a as PaginationButton } from './chunk-25a06983.js';
export { P as BPagination, a as BPaginationButton } from './chunk-25a06983.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Pagination);
    registerComponent(Vue, PaginationButton);
  }
};
use(Plugin);

export default Plugin;
