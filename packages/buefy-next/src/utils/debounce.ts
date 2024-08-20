/* eslint-disable @typescript-eslint/no-explicit-any */
export default function <This, Args extends any[]> (
    func: (this: This, ...args: Args) => unknown,
    wait: number,
    immediate?: boolean
): (this: This, ...args: Args) => void {
    let timeout: ReturnType<typeof setTimeout> | undefined
    return function (this: This, ...args: Args) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this
        const later = function () {
            timeout = undefined
            if (!immediate) func.apply(context, args)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}
