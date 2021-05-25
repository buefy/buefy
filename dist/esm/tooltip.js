import './chunk-1fafdf15.js';
import './helpers.js';
import './chunk-953eb524.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import { T as Tooltip } from './chunk-698bea2d.js';
export { T as BTooltip } from './chunk-698bea2d.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Tooltip);
  }
};
use(Plugin);

export default Plugin;
