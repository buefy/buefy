# Vue 2 &rightarrow; Vue 3 Migration Note

Here are major challenges I faced during migration of Buefy from Vue 2 to Vue 3.

## Component alone cannot mount itself

A component instance no longer has the `$mount` method in Vue 3.
To mount a component, a Vue app instance is necessary.
In Buefy, mounting a new component was utilized to create a component instance which is programmatically mounted; e.g., `modal.open`, `toast.open`.
One Vue app instance can mount only one root component, so another Vue app instance has to be created with the [`createApp`](https://v3.vuejs.org/api/global-api.html#createapp) API to mount a new component.
To programmatically mount a component, I changed the code to create a brand-new Vue app instance as a mounting point of the component.
The major drawback of this workaround is that a brand-new Vue app **inherits no plugins**, thus **even components of Buefy itself cannot be used in a programmatically mounted component**.
As far as I investigated, there is no API to duplicate a Vue app instance.
This will be especially problematic when a user wants to programmatically open a `Modal` with a custom component.
Components that a custom component depends on have to be explicitly specified in the `components` field.
See [#0461fbb890ea6f2b91c1579bf3ffc03916ed2a4e](https://github.com/kikuomax/buefy/commit/0461fbb890ea6f2b91c1579bf3ffc03916ed2a4e), and [#06cd713ac6d12b98010f073532cdaebd3cf04e3c](https://github.com/kikuomax/buefy/commit/06cd713ac6d12b98010f073532cdaebd3cf04e3c).

## No meaning of newing a component

Newing a component does not make sense on Vue 3.
Newing a component was utilized to create a default `Table` column renderer.
I made a new function `mockTableColumn` that creates an object that mocks the behavior of a `Table` column renderer.
See [#b88f123ce63100eaf413dbeb64e95449afef3cc0](https://github.com/kikuomax/buefy/commit/b88f123ce63100eaf413dbeb64e95449afef3cc0), and [#fadde8037ec8ca4d9bffacc075e00442419c24e3](https://github.com/kikuomax/buefy/commit/fadde8037ec8ca4d9bffacc075e00442419c24e3).

## Component cannot be obtained from a slot

As far as I investigated, no component instance can be obtained from a slot on Vue 3.

This was problematic for `Table` as it tried to list `TableColumns` specified in the default slot.
As a workaround, `TableColumns` registers itself to the parent `Table` when it is created, and removes it from the `Table` when it is unmounted.
See [#985f615002fa2cc06f92e74d9f3d8b49cccc0f08](https://github.com/kikuomax/buefy/commit/985f615002fa2cc06f92e74d9f3d8b49cccc0f08)

`ProviderParentMixin`, and `InejctedChildMixin` that are used by `Steps`, `Carousel`, etc. also faced this issue.
When a sorted flag is set, `ProviderParentMixin` indexes `InjectedChildMixin`s according to the index in the default slot.
I could not figure out how to enumerate component instances in the default slot.
So I introduced a new prop `order` to `InjectedChildMixin`, that is used to sort items.
See [#4e8458de0e826618c71bf38c9cd728dae8eacbe0](https://github.com/kikuomax/buefy/commit/4e8458de0e826618c71bf38c9cd728dae8eacbe0).

## `v-model` binding changed

Default `v-model` prop and event are changed,
- prop: `value` &rightarrow; `modelValue`
- event: `input` &rightarrow; `update:modelValue`

See also [Vue's migration guide](https://v3.vuejs.org/guide/migration/v-model.html).

## No `$destroy`

There is no equivalent of [`$destroy`](https://vuejs.org/v2/api/#vm-destroy) in Vue 3.
This is problematic for Buefy, because a programmatically mounted component has to destroy itself.
I solved this problem by moving the responsibility for destruction from a component to a Vue app instance created when the component is programmatically mounted (see the section [Component cannot be newed](#component-cannot-be-newed)).

See also [Vue's migration guide](https://v3.vuejs.org/guide/migration/introduction.html#removed-apis).

## Boolean attribute is not removed if it is `false`

On Vue 2, setting a boolean attribute to `false` is equivalent to removing it.
On Vue 3, setting a boolean attribute to `false` does not remove it, but `null` or `undefined` has to be specified to do so.
This caused some components look disabled even if the flag is set `false`.
I introduced computed values that become `true` or `undefined`, and associated them to boolean attributes instead.
Here are related commits,
- `Siwthc` ([#945ec316cbfa7516832ff6d88b6f09c9f6211595](https://github.com/kikuomax/buefy/commit/945ec316cbfa7516832ff6d88b6f09c9f6211595))
- `Checkbox` ([#7dfb2ac820ce1fef90f8eb8f7d78bb155511f0a4](https://github.com/kikuomax/buefy/commit/7dfb2ac820ce1fef90f8eb8f7d78bb155511f0a4))
- `Pagination` ([#7628214d132547b749ffd0e7be31c6e303ab3520](https://github.com/kikuomax/buefy/commit/7628214d132547b749ffd0e7be31c6e303ab3520))
- `CheckboxButton` ([#a35f88c6ab52114d75a8cf88cc89daa35094ae36](https://github.com/kikuomax/buefy/commit/a35f88c6ab52114d75a8cf88cc89daa35094ae36))
- `Taginput` ([#7f9b567ec91cef54f504ee98f99722ca68e317a6](https://github.com/kikuomax/buefy/commit/7f9b567ec91cef54f504ee98f99722ca68e317a6))
- `Clockpicker` ([#3a51f8053d99269dc9fbc6c9c259513890f6f21d](https://github.com/kikuomax/buefy/commit/3a51f8053d99269dc9fbc6c9c259513890f6f21d))
- `Datepicker` ([#65b40320484f5f3ccc1499616794f57221f4d1ff](https://github.com/kikuomax/buefy/commit/65b40320484f5f3ccc1499616794f57221f4d1ff))
- `Datetimepicker` ([#cf00794a17a54982c1069687983c7d929cb15eec](https://github.com/kikuomax/buefy/commit/cf00794a17a54982c1069687983c7d929cb15eec))
- `Numberinput` ([#7bf7baf0ba8e5b7f8b60d145d7fe76c27d12b31d](https://github.com/kikuomax/buefy/commit/7bf7baf0ba8e5b7f8b60d145d7fe76c27d12b31d))
- `RadioButton` ([#847686f54e21d5f25bbbbcb53e7c2e7439f5a8be](https://github.com/kikuomax/buefy/commit/847686f54e21d5f25bbbbcb53e7c2e7439f5a8be))
- `Timepicker` ([#6a9627a668b721a2b0b4f71f8183beb41a921b08](https://github.com/kikuomax/buefy/commit/6a9627a668b721a2b0b4f71f8183beb41a921b08))
- `Upload` ([#ef6701828e2d7f52bd2d0dc7c0f1aff57ef1c2d8](https://github.com/kikuomax/buefy/commit/ef6701828e2d7f52bd2d0dc7c0f1aff57ef1c2d8))
- `Steps` ([#4e8458de0e826618c71bf38c9cd728dae8eacbe0](https://github.com/kikuomax/buefy/commit/4e8458de0e826618c71bf38c9cd728dae8eacbe0))
- `Tag` ([#f64625f2cd69563183d916da1be8b3e04994a314](https://github.com/kikuomax/buefy/commit/f64625f2cd69563183d916da1be8b3e04994a314))

## Global `h` function

On Vue 3, a `render` function no longer takes a "create element" function, aka `h`, but the `h` function is [defined globally](https://v3.vuejs.org/api/global-api.html#h).
The second argument `props` of the global `h` API has been simplified; e.g., `staticClass` is merged to `class`, `on` is removed.

See also,
- section ["on{EventName} binding"](#oneventname-binding)
- [Vue's migration guide](https://v3.vuejs.org/guide/migration/render-function-api.html).

## on{EventName} binding

### No `$listeners`

On Vue 3, there is no `$listeners` but it is a part of `$attrs`.
A listener attribute name is "on" + event name.

See also [Vue's migration guide](https://v3.vuejs.org/guide/migration/listeners-removed.html).

### `h` function argument

On Vue 3, the second argument (`props`) of the `h` function handles a field whose name starts with "on" followed by an event name as event listener for the event.
For example, `onClick` listens for `click` event.
This causes conflict in props of `Dialog`, and `Modal`.
They intended to take `onConfirm`, and `onCancel` props as callback functions independent from event listeners.
But they are interpreted as event listeners on Vue 3.
As a workaround, the callback functions are renamed to `confirmCallback`, and `cancelCallback` respectively.
See [#185e353a154b661ba2fa423e5066a4cea761250a](https://github.com/kikuomax/buefy/commit/185e353a154b661ba2fa423e5066a4cea761250a).

See also [Vue's migration guide](https://v3-migration.vuejs.org/breaking-changes/render-function-api.html#vnode-props-format).

In the version `v0.9.21-vue3-1`, you had to specify `confirmCallback`, and `cancelCallback` properties instead of `onConfirm`, and `onCancel` respectively when you want to programmatically open a `Dialog`.
However, since the version `v0.9.21-vue3-2`, `onConfirm`, and `onCancel` are back again, and you have to specify `onConfirm`, and `onCancel` to programmatically open a `Dialog`.
See [#529394d7c77967bc156a386a99a9dda6c78d2780](https://github.com/kikuomax/buefy/commit/529394d7c77967bc156a386a99a9dda6c78d2780).

## Emitted events

On Vue 3, events emitted from a component has to be listed in the `emits` field.
Failing to list events may cause accidental binding of event listeners when `v-bind="$attrs"` is used.
For example, `Taginput` emits a `typing` event, and its child `Autocomplete` also emits a `typing` event.
If the `typing` event is not listed in the `emits` field of `Taginput`, a listener for `typing` events from `Taginput` will be called twice when a single `typing` event is emitted, one from `Taginput`, and the other from `Autocomplete`.
See [#7f9b567ec91cef54f504ee98f99722ca68e317a6](https://github.com/kikuomax/buefy/commit/7f9b567ec91cef54f504ee98f99722ca68e317a6).

## No directives

On Vue 3, the global `h` API no longer takes `directives`, use the global `withDirectives` API instead.
Vue 3 exports deicated objects representing built-in directives,

For example, `v-show` &rightarrow; `vShow`.

```js
import { vShow } from 'vue'
```

See [#95ff83f99a1ad8ba5d0764982ea80182cac77ecc](https://github.com/kikuomax/buefy/commit/95ff83f99a1ad8ba5d0764982ea80182cac77ecc), and [#e94e408bbb8090a53a02d53498bb0d1a0020c123](https://github.com/kikuomax/buefy/commit/e94e408bbb8090a53a02d53498bb0d1a0020c123).

See also [Vue's API reference](https://v3.vuejs.org/api/global-api.html#withdirectives).

## Directive hooks are renamed

Directives defined in Buefy had to be updated.
- `trapFocus` ([#baaf22ccc6efaaf78c6c5f53f8679d22ad2a4d75](https://github.com/kikuomax/buefy/commit/baaf22ccc6efaaf78c6c5f53f8679d22ad2a4d75))
- `clickOutside` ([#95ff83f99a1ad8ba5d0764982ea80182cac77ecc](https://github.com/kikuomax/buefy/commit/95ff83f99a1ad8ba5d0764982ea80182cac77ecc))

See also [Vue's migration guide](https://v3.vuejs.org/guide/migration/custom-directives.html).

## Functional component must be a function

On Vue 3, a single file component cannot be `functional`.
I had to rewrite `MenuList` as a function.
See [#cf925c21a0644d67211bd396cef0b173e377e582](https://github.com/kikuomax/buefy/commit/cf925c21a0644d67211bd396cef0b173e377e582).

See also [Vue's migration guide](https://v3.vuejs.org/guide/migration/functional-components.html#overview).

## No automatic component resolution

The `h` global API does not resolve a component name.
The [`resolveComponent`](https://v3.vuejs.org/api/global-api.html#resolvecomponent) global API has to be called.

Vue 3 exports dedicated objects for built-in components, `Transition` for example.

```js
import { Transition } from 'vue'
```

## Transition CSS class names changed

As some transition CSS class names have been changed in Vue 3, I had to update [src/scss/utils/_animations.scss](./src/scss/utils/_animations.scss).
See [#c01b9fb5a42447c417ec6a55b30e674cd5f115d8](https://github.com/kikuomax/buefy/commit/c01b9fb5a42447c417ec6a55b30e674cd5f115d8).

See also [Vue's migration guide](https://v3.vuejs.org/guide/migration/transition.html#_3-x-update).

## No `$children`

Vue 3 no longer provies `$children` of a component.
`Menu` depended on `$children` to list menu items, so I had to introduced a register/unregister mechanism to `Menu`.
See [#cf925c21a0644d67211bd396cef0b173e377e582](https://github.com/kikuomax/buefy/commit/cf925c21a0644d67211bd396cef0b173e377e582).

See also [Vue's migration guide](https://v3.vuejs.org/guide/migration/children.html#overview).

## No `_uid`

The internal field `_uid` of a component has been removed (moved?) in Vue 3.
`TabbedChildMixin` used to initialize its `value` prop with `this._uid`, and this no longer works (there is another reason that no `this` is available during prop initialization).
A Vue client code should not depend on an internal field anyway, so I introduced a new function `makeUniqueId` defined in a new file [`src/utils/make-unique-id.js`](./src/utils/make-unique-id.js), that returns a random number.
It depends on [`window.crypto.subtle`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/subtle).
See [#b8627e4ce307018d40d9bd6bcef9d1aed3af9247](https://github.com/kikuomax/buefy/commit/b8627e4ce307018d40d9bd6bcef9d1aed3af9247).

## v-for &times; ref does not list components

The special behavior of a `v-for` &times; `ref="X"` combination, where `refs.X` becomes an array of components `ref`ed by "X", is no longer supported on Vue 3.
As a workaround, I replaced "X" so that every component in a loop has a unique ref ID.
See [#872bb92d8d5037ef608faa377a7811abfa422e4b](https://github.com/kikuomax/buefy/commit/872bb92d8d5037ef608faa377a7811abfa422e4b).

## `inheritAttrs=false` affects `class` and `style`

On Vue 3, `class`, and `style` are members of `$attrs`, so setting `inheritAttrs=false` does not apply `class`, and `style` to the root element.
I had to manually copy `class`, and `style` to the root element.
See [#ef6701828e2d7f52bd2d0dc7c0f1aff57ef1c2d8](https://github.com/kikuomax/buefy/commit/ef6701828e2d7f52bd2d0dc7c0f1aff57ef1c2d8)

See also [Vue's guide](https://v3.vuejs.org/guide/component-attrs.html#disabling-attribute-inheritance).

## `$el` is `null` during beforeMount

See [#6244af7c22393507f8cd59fb12c8942e727ef9da](https://github.com/kikuomax/buefy/commit/6244af7c22393507f8cd59fb12c8942e727ef9da).

## Head scratchers

The following crashes made me scratch my head,
- Component in `<option>`'s `value`.
  On Vue 3, binding the `value` attribute of an `<option>` element to a component instance crashes.
  This affected `TableMobileSort` used in `Table` because it listed `<option>` elements whose `value`s are bound to individual component instances.
  As a workaround, `value` is bound to an index of a component instead.
  See [#985f615002fa2cc06f92e74d9f3d8b49cccc0f08](https://github.com/kikuomax/buefy/commit/985f615002fa2cc06f92e74d9f3d8b49cccc0f08).
- Execution timing of `$nestTick` changed?
  I had to replace a `$nextTick` call with a `setTimeout` call to wait for other events being processed.
  See [#65b40320484f5f3ccc1499616794f57221f4d1ff](https://github.com/kikuomax/buefy/commit/65b40320484f5f3ccc1499616794f57221f4d1ff).
- Maximum recursion errors. There were several reasons, and workarounds.
    - `v-if`, `v-else`, and `v-slot` in a single template. See [#5be2b401187a0d64d94471ce30de6143047ad571](https://github.com/kikuomax/buefy/commit/5be2b401187a0d64d94471ce30de6143047ad571).
    - Immediate call of watch methods? See [#cb04927f82bb85be9c25ac4a37d493542b2f4478](https://github.com/kikuomax/buefy/commit/cb04927f82bb85be9c25ac4a37d493542b2f4478).
    - Strange infinite updates. See [#f5af65f0e275223e180195b49bca506ad947619d](https://github.com/kikuomax/buefy/commit/f5af65f0e275223e180195b49bca506ad947619d).

## `$scopedSlots` is included in `$slots`

I had to replace many occurrences of `$scopedSlots`, but replacement was straightforward.

See also [Vue's migration guide](https://v3.vuejs.org/guide/migration/slots-unification.html#overview).

## No `.native` modifier for `v-on`

I had to remove `.native` modifiers and list events in the `emits` option, but modification was straightforward.

See also [Vue's migration guide](https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html).

## beforeDestory is renamed to beforeUnmount

Updates were straightforward.

See [Vue's migration guide](https://v3.vuejs.org/guide/migration/introduction.html#other-minor-changes).