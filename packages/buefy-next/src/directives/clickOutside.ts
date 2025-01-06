import type { Directive } from 'vue'

// msMaxTouchPoints is for IE10 which is no longer supported
const isTouch =
  typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
const events = isTouch ? ['touchstart', 'click'] : ['click']

interface EventHandler {
    event: string
    handler: (event: Event) => void
}

interface Instance {
    el: Element
    eventHandlers: EventHandler[]
}

type EventHandlerFn = (event: Event, el: Element) => void

type Middleware = (event: Event, el: Element) => boolean

type EventHandlerOptions = EventHandlerFn | {
    handler: EventHandlerFn,
    middleware?: Middleware,
    events: string[]
}

const instances: Instance[] = []

function processArgs(bindingValue: EventHandlerOptions) {
    const isFunction = typeof bindingValue === 'function'
    if (!isFunction && typeof bindingValue !== 'object') {
        throw new Error(`v-click-outside: Binding value should be a function or an object, ${typeof bindingValue} given`)
    }

    return {
        handler: isFunction ? bindingValue : bindingValue.handler,
        middleware: (!isFunction && bindingValue.middleware) ||
            ((isClickOutside) => !!isClickOutside),
        events: (!isFunction && bindingValue.events) || events
    }
}

function onEvent(
    { el, event, handler, middleware }: {
        el: Element,
        event: Event,
        handler: EventHandlerFn,
        middleware: Middleware
    }
) {
    const isClickOutside = event.target !== el && !el.contains(event.target as Element)

    if (!isClickOutside || !middleware(event, el)) {
        return
    }

    handler(event, el)
}

function toggleEventListeners<Action extends 'add' | 'remove'>({ eventHandlers }: Instance, action: Action) {
    eventHandlers!.forEach(({ event, handler }) => {
        document[`${action}EventListener`](event, handler)
    })
}

function beforeMount(el: Element, { value }: { value: EventHandlerOptions }) {
    const { handler, middleware, events } = processArgs(value)

    const instance = {
        el,
        eventHandlers: events.map((eventName) => ({
            event: eventName,
            handler: (event: Event) => onEvent({ event, el, handler, middleware })
        }))
    }

    toggleEventListeners(instance, 'add')

    instances.push(instance)
}

function updated(el: Element, { value }: { value: EventHandlerOptions }) {
    const { handler, middleware, events } = processArgs(value)
    // `filter` instead of `find` for compat with IE
    const instance = instances.filter((instance) => instance.el === el)[0]

    toggleEventListeners(instance, 'remove')

    instance.eventHandlers = events.map((eventName) => ({
        event: eventName,
        handler: (event) => onEvent({ event, el, handler, middleware })
    }))

    toggleEventListeners(instance, 'add')
}

function unmounted(el: Element) {
    // `filter` instead of `find` for compat with IE
    const instance = instances.filter((instance) => instance.el === el)[0]

    toggleEventListeners(instance, 'remove')

    // FIXME: remove instance from instances
}

const directive: Directive<Element, EventHandlerOptions> = {
    beforeMount,
    updated,
    unmounted
}

export default directive
