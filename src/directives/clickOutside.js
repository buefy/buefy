const isTouch =
  typeof window !== 'undefined' && ('ontouchstart' in window || navigator.msMaxTouchPoints > 0)
const events = isTouch ? ['touchstart', 'click'] : ['click']

const instances = []

function processArgs(bindingValue) {
    const isFunction = typeof bindingValue === 'function'
    if (!isFunction && typeof bindingValue !== 'object') {
        throw new Error(`v-click-outside: Binding value should be a function or an object, typeof ${bindingValue} given`)
    }

    return {
        handler: isFunction ? bindingValue : bindingValue.handler,
        middleware: bindingValue.middleware || ((isClickOutside) => isClickOutside),
        events: bindingValue.events || events
    }
}

function onEvent({ el, event, handler, middleware }) {
    const isClickOutside = event.target !== el && !el.contains(event.target)

    if (!isClickOutside) {
        return
    }

    if (middleware(event, el)) {
        handler(event, el)
    }
}

function bind(el, { value }) {
    const { handler, middleware, events } = processArgs(value)

    const instance = {
        el,
        eventHandlers: events.map((eventName) => ({
            event: eventName,
            handler: (event) => onEvent({ event, el, handler, middleware })
        }))
    }

    instance.eventHandlers.forEach(({ event, handler }) =>
        document.addEventListener(event, handler))
    instances.push(instance)
}

function update(el, { value }) {
    const { handler, middleware, events } = processArgs(value)
    // `filter` instead of `find` for compat with IE
    const instance = instances.filter((instance) => instance.el === el)[0]

    instance.eventHandlers.forEach(({ event, handler }) =>
        document.removeEventListener(event, handler)
    )

    instance.eventHandlers = events.map((eventName) => ({
        event: eventName,
        handler: (event) => onEvent({ event, el, handler, middleware })
    }))

    instance.eventHandlers.forEach(({ event, handler }) =>
        document.addEventListener(event, handler))
}

function unbind(el) {
    // `filter` instead of `find` for compat with IE
    const instance = instances.filter((instance) => instance.el === el)[0]
    instance.eventHandlers.forEach(({ event, handler }) =>
        document.removeEventListener(event, handler)
    )
}

const directive = {
    bind,
    update,
    unbind,
    instances
}

export default directive
