webpackJsonp([80],{165:function(n,o,e){var t=e(0)(e(712),e(822),null,null,null);n.exports=t.exports},712:function(n,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var t={props:["email","password"],template:'\n        <form action="">\n            <div class="modal-card" style="width: auto">\n                <header class="modal-card-head">\n                    <p class="modal-card-title">Login</p>\n                </header>\n                <section class="modal-card-body">\n                    <b-field label="Email">\n                        <b-input\n                            type="email"\n                            :value="email"\n                            placeholder="Your email"\n                            required>\n                        </b-input>\n                    </b-field>\n\n                    <b-field label="Password">\n                        <b-input\n                            type="password"\n                            :value="password"\n                            password-reveal\n                            placeholder="Your password"\n                            required>\n                        </b-input>\n                    </b-field>\n\n                    <b-checkbox>Remember me</b-checkbox>\n                </section>\n                <footer class="modal-card-foot">\n                    <button class="button" type="button" @click="$parent.close()">Close</button>\n                    <button class="button is-primary">Login</button>\n                </footer>\n            </div>\n        </form>\n    '};o.default={components:{ModalForm:t},data:function(){return{isComponentModalActive:!1,formProps:{email:"evan@you.com",password:"testing"}}}}},822:function(n,o){n.exports={render:function(){var n=this,o=n.$createElement,e=n._self._c||o;return e("section",[e("button",{staticClass:"button is-primary is-medium",on:{click:function(o){n.isComponentModalActive=!0}}},[n._v("\n        Launch component modal\n    ")]),n._v(" "),e("b-modal",{attrs:{active:n.isComponentModalActive,"has-modal-card":""},on:{"update:active":function(o){n.isComponentModalActive=o}}},[e("modal-form",n._b({},"modal-form",n.formProps,!1))],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=80.3989f9b911558ff31bff.js.map