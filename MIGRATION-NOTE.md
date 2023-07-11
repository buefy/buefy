# Vue 2 &rightarrow; Vue 3 Migration Note

Here are major challenges I faced during migration of Buefy from Vue 2 to Vue 3.

## Component alone cannot mount itself

A component instance no longer has the `$mount` method in Vue 3.
To mount a component, a Vue app instance is necessary.
In Buefy, mounting a new component was utilized to create a component instance which is programmatically mounted; e.g., `modal.open`, `toast.open`.
One Vue app instance can mount only one root component, so another Vue app instance has to be created with the [`createApp`](https://vuejs.org/api/application.html#createapp) API to mount a new component.
To programmatically mount a component, I changed the code to create a brand-new Vue app instance as a mounting point of the component.
The major drawback of this workaround is that a brand-new Vue app **inherits no plugins**, thus **even components of Buefy itself cannot be used in a programmatically mounted component**.
As far as I investigated, there is no API to duplicate a Vue app instance.
This will be especially problematic when a user wants to programmatically open a `Modal` with a custom component.
Components that a custom component depends on have to be explicitly specified in the `components` field.
See [#8b05481a20ec8bccb03f1c98ad5556442e79258b](https://github.com/buefy/buefy/commit/8b05481a20ec8bccb03f1c98ad5556442e79258b), and [#294d5453d9eecd351b7ae91e3c891c085a0d9c20](https://github.com/buefy/buefy/commit/294d5453d9eecd351b7ae91e3c891c085a0d9c20).

## Component cannot be obtained from a slot

As far as I investigated, no component instance can be obtained from a slot on Vue 3.

This was problematic for `Table` as it tried to list `TableColumns` specified in the default slot.
As a workaround, `TableColumns` registers itself to the parent `Table` when it is created, and removes it from the `Table` when it is unmounted.
See [#34e4f7a872969851a88b082b87cab5d79c2f25f4](https://github.com/buefy/buefy/commit/34e4f7a872969851a88b082b87cab5d79c2f25f4).

`ProviderParentMixin`, and `InejctedChildMixin` that are used by `Steps`, `Carousel`, etc. also faced this issue.
When a sorted flag is set, `ProviderParentMixin` indexes `InjectedChildMixin`s according to the index in the default slot.
I was not able to figure out how to enumerate component instances in the default slot.
So I introduced a new prop `order` to `InjectedChildMixin`, that is used to sort items.
See [#defe37960d284e6de81d3e273e1a18c33b12e2a5](https://github.com/buefy/buefy/commit/defe37960d284e6de81d3e273e1a18c33b12e2a5).

## `v-model` binding changed

Default `v-model` prop and event are changed,
- prop: `value` &rightarrow; `modelValue`
- event: `input` &rightarrow; `update:modelValue`

On Vue 3, we cannot use other name than "modelValue" for the default `v-model` binding.

See also [Vue's migration guide](https://v3-migration.vuejs.org/breaking-changes/v-model.html).

## No meaning of newing a component

Newing a component does not make sense on Vue 3.
Newing a component was utilized to create a default `Table` column renderer.
I made a new function `mockTableColumn` that creates an object that mocks the behavior of a `Table` column renderer.
See [#017531f4a1d910357c10799621101046f4098b15](https://github.com/buefy/buefy/commit/017531f4a1d910357c10799621101046f4098b15), and [#ea627f685327326c3d979541c56a6a58a3ea63ea](https://github.com/buefy/buefy/commit/ea627f685327326c3d979541c56a6a58a3ea63ea).

## No `$destroy`

There is no equivalent of [`$destroy`](https://v2.vuejs.org/v2/api/#vm-destroy) in Vue 3.
This is problematic for Buefy, because a programmatically mounted component has to destroy itself.
I worked around this problem by moving the responsibility for destruction from a component to a Vue app instance created when the component is programmatically mounted (see the section [Component cannot be newed](#component-cannot-be-newed)).

See also [Vue's migration guide](https://v3-migration.vuejs.org/breaking-changes/#removed-apis).

## Boolean attribute is not removed if it is `false`

On Vue 2, setting a boolean attribute to `false` is equivalent to removing it.
On Vue 3, setting a boolean attribute to `false` does not remove it, but `null` or `undefined` has to be specified to do so.
This caused some components look disabled even if the flag is set `false`.
I introduced computed values that become `true` or `undefined`, and associated them to boolean attributes instead.
Here are related commits,
- `Switch` ([#1a878a9f7b9851e610329d1f82208d8103505cb2](https://github.com/buefy/buefy/commit/1a878a9f7b9851e610329d1f82208d8103505cb2))
- `Checkbox` ([#c8aad46a709e7f99bc061ba28f2e650c0be223ca](https://github.com/buefy/buefy/commit/c8aad46a709e7f99bc061ba28f2e650c0be223ca))
- `Pagination` ([#403997b623792d530585bb24d7285c68881db505](https://github.com/buefy/buefy/commit/403997b623792d530585bb24d7285c68881db505))
- `CheckboxButton` ([#989a7126dc5e5585de257b1732720eeab9ac890a](https://github.com/buefy/buefy/commit/989a7126dc5e5585de257b1732720eeab9ac890a))
- `Taginput` ([#9e29ecc11439f223a1f8f2d140a495680df14903](https://github.com/buefy/buefy/commit/9e29ecc11439f223a1f8f2d140a495680df14903))
- `Clockpicker` ([#33e4086186446abd6f7ed82fe86b5e029090adb3](https://github.com/buefy/buefy/commit/33e4086186446abd6f7ed82fe86b5e029090adb3))
- `Datepicker` ([#c99a8dd0d4cdc5ae27f5eb0677d7a4e80c45bc1c](https://github.com/buefy/buefy/commit/c99a8dd0d4cdc5ae27f5eb0677d7a4e80c45bc1c))
- `Datetimepicker` ([#c3b8668d300f4d607b1d03973e72e406914ef404](https://github.com/buefy/buefy/commit/c3b8668d300f4d607b1d03973e72e406914ef404))
- `Numberinput` ([#768a9573fd1b1eab90b6404ea922374e3bfa327b](https://github.com/buefy/buefy/commit/768a9573fd1b1eab90b6404ea922374e3bfa327b))
- `RadioButton` ([#f1c2f847d91d79f32c86871b03ae1b187f9cf94d](https://github.com/buefy/buefy/commit/f1c2f847d91d79f32c86871b03ae1b187f9cf94d))
- `Timepicker` ([#f5026d6b9978b9c0ae783430edc537eff828e3e8](https://github.com/buefy/buefy/commit/f5026d6b9978b9c0ae783430edc537eff828e3e8))
- `Upload` ([#6f8952ec1389b1f74683f69fb04aac4beae62140](https://github.com/buefy/buefy/commit/6f8952ec1389b1f74683f69fb04aac4beae62140))
- `Steps` ([#defe37960d284e6de81d3e273e1a18c33b12e2a5](https://github.com/buefy/buefy/commit/defe37960d284e6de81d3e273e1a18c33b12e2a5))
- `Tag` ([#f694e824c74262260869dc58f352a13f936ad2a1](https://github.com/buefy/buefy/commit/f694e824c74262260869dc58f352a13f936ad2a1))

## Global `h` function

On Vue 3, a [`render`](https://vuejs.org/api/options-rendering.html#render) function no longer takes a "create element" function, aka `h`, but the `h` function is [defined globally](https://v3.vuejs.org/api/global-api.html#h).
The second argument `props` of the global `h` API has been simplified; e.g., `staticClass` is merged to `class`, `on` is removed.

See also,
- [Section "on{EventName} binding"](#oneventname-binding)
- [Vue's migration guide](https://v3-migration.vuejs.org/breaking-changes/render-function-api.html).
- [`h` API on Vue 3](https://vuejs.org/api/render-function.html#h)

## on{EventName} binding

### No `$listeners`

On Vue 3, there is no `$listeners` but it is a part of `$attrs`.
A listener attribute name is "on" + event name.

See also [Vue's migration guide](https://v3-migration.vuejs.org/breaking-changes/listeners-removed.html).

### `h` function argument

On Vue 3, the second argument (`props`) of the `h` function handles a field whose name starts with "on" followed by an event name as event listener for the event.
For example, `onClick` listens for `click` event.
This causes conflict in props of `Dialog`, and `Modal`.
They intended to take `onConfirm`, and `onCancel` props as callback functions independent from event listeners.
But they are interpreted as event listeners on Vue 3.
As a workaround, the callback functions are renamed to `confirmCallback`, and `cancelCallback` respectively.
See [#a415f3aef052fdc39c5322372ae0f7d8665c6e9f](https://github.com/buefy/buefy/commit/a415f3aef052fdc39c5322372ae0f7d8665c6e9f).

See also [Vue's migration guide](https://v3-migration.vuejs.org/breaking-changes/render-function-api.html#vnode-props-format).

The above workaround was reconsidered, and the compatibility with Buefy for Vue 2 was restored.
So you have to specify `onConfirm`, and `onCancel` instead of `confirmCallback`, and `cancelCallback` to programmatically open a `Dialog`.
See [#76b7b91d06541a7e09b9122a9f557ab0d1f0f371](https://github.com/buefy/buefy/commit/76b7b91d06541a7e09b9122a9f557ab0d1f0f371).

## Emitted events

On Vue 3, events emitted from a component has to be listed in the `emits` field.
Failing to list events may cause accidental binding of event listeners when `v-bind="$attrs"` is used.
For example, `Taginput` emits a `typing` event, and its child `Autocomplete` also emits a `typing` event.
If the `typing` event is not listed in the `emits` field of `Taginput`, a listener for `typing` events from `Taginput` will be called twice when a single `typing` event is emitted, one from `Taginput`, and the other from `Autocomplete`.
See [#9e29ecc11439f223a1f8f2d140a495680df14903](https://github.com/buefy/buefy/commit/9e29ecc11439f223a1f8f2d140a495680df14903).

## No directives

On Vue 3, the global `h` API no longer takes `directives`, use the global [`withDirectives`](https://vuejs.org/api/render-function.html#withdirectives) API instead.
Vue 3 exports deicated objects representing built-in directives,

For example, `v-show` &rightarrow; `vShow`.

```js
import { vShow } from 'vue'
```

See [#5bc62ffbeba831f60fe1b755b2e5fe7c5e25d3ed](https://github.com/buefy/buefy/commit/5bc62ffbeba831f60fe1b755b2e5fe7c5e25d3ed), and [#690d28996dd2eecc1e5059f5ef349351c017f533](https://github.com/buefy/buefy/commit/690d28996dd2eecc1e5059f5ef349351c017f533).

See also [Vue's API reference](https://vuejs.org/api/render-function.html#withdirectives).

## Directive hooks are renamed

Directives defined in Buefy had to be updated.
- `trapFocus` ([#a18bf8d12d5245427473ad73d51bc7f72ac13a87](https://github.com/buefy/buefy/commit/a18bf8d12d5245427473ad73d51bc7f72ac13a87))
- `clickOutside` ([#5bc62ffbeba831f60fe1b755b2e5fe7c5e25d3ed](https://github.com/buefy/buefy/commit/5bc62ffbeba831f60fe1b755b2e5fe7c5e25d3ed))

See also [Vue's migration guide](https://v3-migration.vuejs.org/breaking-changes/custom-directives.html).

## Functional component must be a function

On Vue 3, a single file component cannot be `functional`.
I had to rewrite `MenuList` as a function.
See [#f85445f7a806c52a524960e24714bbf2b4c80d95](https://github.com/buefy/buefy/commit/f85445f7a806c52a524960e24714bbf2b4c80d95).

See also [Vue's migration guide](https://v3-migration.vuejs.org/breaking-changes/functional-components.html).

## No automatic component resolution

The `h` global API does not resolve a component name.
The [`resolveComponent`](https://vuejs.org/api/render-function.html#resolvecomponent) global API has to be called.
You can find an example in [#730b0a22ac481255287c8a8725041e947e7c02ab](https://github.com/buefy/buefy/commit/730b0a22ac481255287c8a8725041e947e7c02ab).

For built-in components, Vue 3 exports dedicated objects, [`Transition`](https://vuejs.org/api/built-in-components.html#transition) for example.

```js
import { Transition } from 'vue'
```

## Transition CSS class names changed

As some transition CSS class names have been changed in Vue 3, I had to update [src/scss/utils/_animations.scss](./src/scss/utils/_animations.scss).
See [#82136338ca6cdf7be3b4b2d134e457074f5ffcb1](https://github.com/buefy/buefy/commit/82136338ca6cdf7be3b4b2d134e457074f5ffcb1).

See also [Vue's migration guide](https://v3-migration.vuejs.org/breaking-changes/transition.html).

## No `$children`

Vue 3 no longer provies `$children` of a component.
`Menu` depended on `$children` to list menu items, so I had to introduced a register/unregister mechanism to `Menu`.
See [#f85445f7a806c52a524960e24714bbf2b4c80d95](https://github.com/buefy/buefy/commit/f85445f7a806c52a524960e24714bbf2b4c80d95).

See also [Vue's migration guide](https://v3-migration.vuejs.org/breaking-changes/children.html).

## No `_uid`

The internal field `_uid` of a component has been removed (moved?) in Vue 3.
`TabbedChildMixin` used to initialize its `value` prop with `this._uid`, and this no longer works (there is another reason that no `this` is available during prop initialization).
A Vue client code should not depend on an internal field anyway, so I introduced a new function `makeUniqueId` defined in a new file [`src/utils/make-unique-id.js`](./src/utils/make-unique-id.js), that returns a random number.
It depends on [`window.crypto.subtle`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/subtle).
See [#bd1fe22948dc1b65fe897d97c5891bcb131fb820](https://github.com/buefy/buefy/commit/bd1fe22948dc1b65fe897d97c5891bcb131fb820).

## v-for &times; ref does not list components

The special behavior of a `v-for` &times; `ref="X"` combination, where `refs.X` becomes an array of components `ref`ed by "X", is no longer supported on Vue 3.
As a workaround, I replaced "X" so that every component in a loop has a unique ref ID.
See [#bd1fe22948dc1b65fe897d97c5891bcb131fb820](https://github.com/buefy/buefy/commit/bd1fe22948dc1b65fe897d97c5891bcb131fb820).

## `inheritAttrs=false` affects `class` and `style`

On Vue 3, `class`, and `style` are members of `$attrs`, so setting `inheritAttrs=false` does not apply `class`, and `style` to the root element.
I had to manually copy `class`, and `style` to the root element.
See [#6f8952ec1389b1f74683f69fb04aac4beae62140](https://github.com/buefy/buefy/commit/6f8952ec1389b1f74683f69fb04aac4beae62140).

See also [Vue's guide](https://v3.vuejs.org/guide/component-attrs.html#disabling-attribute-inheritance).

## `$el` is `null` during beforeMount

See [#bf6e9cd680298b1a8b572bdb1d742f9ac0eca769](https://github.com/buefy/buefy/commit/bf6e9cd680298b1a8b572bdb1d742f9ac0eca769).

## Head scratchers

The following subtle errors made me scratch my head,
- Component in `<option>`'s `value`.
  On Vue 3, binding the `value` attribute of an `<option>` element to a component instance crashes.
  This affected `TableMobileSort` used in `Table`, because it listed `<option>` elements whose `value`s are bound to individual component instances.
  As a workaround, `value` is bound to an index of a component instead.
  See [#34e4f7a872969851a88b082b87cab5d79c2f25f4](https://github.com/buefy/buefy/commit/34e4f7a872969851a88b082b87cab5d79c2f25f4).
- Execution timing of [`$nextTick`](https://vuejs.org/api/component-instance.html#nexttick) changed?
  I had to replace a `$nextTick` call with a `setTimeout` call to wait for other events being processed.
  See [#c99a8dd0d4cdc5ae27f5eb0677d7a4e80c45bc1c](https://github.com/buefy/buefy/commit/c99a8dd0d4cdc5ae27f5eb0677d7a4e80c45bc1c).
- Maximum recursion errors. There were several reasons, and workarounds.
    - `v-if`, `v-else`, and `v-slot` in a single template. See [#07be36f5d2ed8da85ccfb56c52d53eca9c393081](https://github.com/buefy/buefy/commit/07be36f5d2ed8da85ccfb56c52d53eca9c393081).
    - Immediate call of watch methods? See [#8f3b92c6ebebe719f792c00314168215de7892ec](https://github.com/buefy/buefy/commit/8f3b92c6ebebe719f792c00314168215de7892ec).
    - Strange infinite updates. See [#93d22e93bec547a36515b8522f949dd17b0b5e01](https://github.com/buefy/buefy/commit/93d22e93bec547a36515b8522f949dd17b0b5e01).

## `$scopedSlots` is included in `$slots`

I had to replace many occurrences of `$scopedSlots`, but replacement was straightforward.

See also [Vue's migration guide](https://v3-migration.vuejs.org/breaking-changes/slots-unification.html).

## No `.native` modifier for `v-on`

I had to remove `.native` modifiers and list events in the `emits` option, but modification was straightforward.

See also [Vue's migration guide](https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html).

## beforeDestory is renamed to beforeUnmount

Updates were straightforward.

See [Vue's migration guide](https://v3-migration.vuejs.org/breaking-changes/#other-minor-changes).