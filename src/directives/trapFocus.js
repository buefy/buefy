const findFocusable = (element) => {
    if (!element) {
        return null
    }
    return element.querySelectorAll(`a[href],
                                     area[href],
                                     input:not([disabled]),
                                     select:not([disabled]),
                                     textarea:not([disabled]),
                                     button:not([disabled]),
                                     iframe,
                                     object,
                                     embed,
                                     *[tabindex],
                                     *[contenteditable]`)
}

let onKeyDown

const bind = (el, { value = true }) => {
    if (value) {
        const focusable = findFocusable(el)

        if (focusable && focusable.length > 0) {
            const firstFocusable = focusable[0]
            const lastFocusable = focusable[focusable.length - 1]

            onKeyDown = (event) => {
                if (event.target === firstFocusable && event.shiftKey && event.key === 'Tab') {
                    event.preventDefault()
                    lastFocusable.focus()
                } else if (event.target === lastFocusable && !event.shiftKey && event.key === 'Tab') {
                    event.preventDefault()
                    firstFocusable.focus()
                }
            }
            el.addEventListener('keydown', onKeyDown)
            firstFocusable.focus()
        }
    }
}

const unbind = (el) => {
    el.removeEventListener('keydown', onKeyDown)
}

const directive = {
    bind,
    unbind
}

export default directive
