import { shallowRef } from 'vue'
import type { ShallowRef } from 'vue'

export function preformat(text?: string): string | undefined {
    if (!text) return

    // Remove first blank line
    text = text.replace(/^\s*[\r\n]/g, '')

    // Find how many whitespaces before the first character of the first line
    // @ts-expect-error - the pattern should always match
    const whitespaces = /^[ \t]*./.exec(text).toString().slice(0, -1)

    // Replace first occurrance of whitespace on each line
    const newText: string[] = []
    text.split(/\r\n|\r|\n/).forEach((line) => {
        newText.push(line.replace(whitespaces, ''))
    })
    return newText.join('\r\n')
}

// Wraps all the fields of a given object with `shallowRef`.
//
// This is useful when you want to wrap Example components with `shallowRef`.
export function shallowFields<T >(
    fields: { [K in keyof T]: T[K] }
): { [K in keyof T]: ShallowRef<T[K]> } {
    // eslint-disable-next-line no-use-before-define
    const shallow = {} as { [K in keyof T]: ShallowRef<T[K]> }
    for (const key in fields) {
        shallow[key] = shallowRef(fields[key])
    }
    return shallow
}
