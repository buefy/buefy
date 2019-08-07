import { getValueByPath, indexOf, escapeRegExpChars, removeElement } from './helpers'

describe('helpers', () => {
    describe('getValueByPath', () => {
        it('get value of an object property/path even if it is nested', () => {
            const obj = {
                val1: 'val1',
                val2: {
                    val21: 'val21'
                },
                val3: {
                    val31: {
                        val311: 'val311'
                    }
                }
            }

            expect(getValueByPath(obj, 'val1')).toBe('val1')
            expect(getValueByPath(obj, 'val2.val21')).toBe('val21')
            expect(getValueByPath(obj, 'val3.val31.val311')).toBe('val311')
        })
    })

    describe('indexOf', () => {
        it('get index of an array element using equality function', () => {
            const obj1 = {
                id: 1
            }
            const obj2 = {
                id: 2
            }
            const obj3 = {
                id: 3
            }
            const obj4 = {
                id: 4
            }
            const obj5 = {
                id: 5
            }
            const arr = [
                obj1,
                obj2,
                obj3,
                obj4
            ]
            const fnc = (obj1, obj2) => {
                return obj1.id === obj2.id
            }

            expect(indexOf(arr, obj1, fnc)).toBe(0)
            expect(indexOf(arr, obj2, fnc)).toBe(1)
            expect(indexOf(arr, obj3, fnc)).toBe(2)
            expect(indexOf(arr, obj4, fnc)).toBe(3)
            expect(indexOf(arr, obj5, fnc)).toBe(-1)
            expect(indexOf(null, obj1, fnc)).toBe(-1)
            expect(indexOf(arr, obj1)).toBe(0)
        })
    })

    describe('escapeRegExpChars', () => {
        it('escape regex characters', () => {
            const initial = 'All of these should be escaped: \\ ^ $ * + ? . ( ) | { } [ ]'
            const expected = 'All of these should be escaped: \\\\ \\^ \\$ \\* \\+ \\? \\. \\( \\) \\| \\{ \\} \\[ \\]'

            expect(escapeRegExpChars(null)).toBeNull()
            expect(escapeRegExpChars(initial)).toBe(expected)
        })
    })

    describe('removeElement', () => {
        it('calls remove function from the element if it exists', () => {
            const elm = {
                remove: jest.fn()
            }

            removeElement(elm)
            expect(elm.remove).toHaveBeenCalled()
        })

        it('calls parentNode.removeChild function from the element if it exists', () => {
            const elm = {
                parentNode: {
                    removeChild: jest.fn()
                }
            }

            removeElement(elm)
            expect(elm.parentNode.removeChild).toHaveBeenCalled()
        })
    })
})
