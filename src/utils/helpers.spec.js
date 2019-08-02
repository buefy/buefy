import { getValueByPath, indexOf, escapeRegExpChars } from './helpers'

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
                selected: true,
                valid: false
            }
            const obj2 = {
                selected: false,
                valid: false
            }
            const obj3 = {
                selected: true,
                valid: true
            }
            const obj4 = {
                selected: false,
                valid: true
            }
            const arr = [
                obj1,
                obj2,
                obj3,
                obj4
            ]
            const fnc = (obj1, obj2) => {
                return obj1.selected === obj2.selected && obj1.valid === obj2.valid
            }

            expect(indexOf(arr, obj1, fnc)).toBe(0)
            expect(indexOf(arr, obj2, fnc)).toBe(1)
            expect(indexOf(arr, obj3, fnc)).toBe(2)
            expect(indexOf(arr, obj4, fnc)).toBe(3)
        })
    })

    describe('escapeRegExpChars', () => {
        it('escape regex characters', () => {
            const initial = 'All of these should be escaped: \\ ^ $ * + ? . ( ) | { } [ ]'
            const expected = 'All of these should be escaped: \\\\ \\^ \\$ \\* \\+ \\? \\. \\( \\) \\| \\{ \\} \\[ \\]'

            expect(escapeRegExpChars(initial)).toBe(expected)
        })
    })
})
