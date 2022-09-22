import Color from '@utils/color'

describe('Color', () => {
    it('parse hex', () => {
        const red = Color.parse('#ff0000')
        const transparentBlue = Color.parse('#0000ff06')

        expect(red.$channels).toEqual(new Uint8Array([255, 0, 0, 255]))
        expect(transparentBlue.$channels).toEqual(new Uint8Array([0, 0, 255, 6]))
        expect(() => Color.parse('#1234567')).toThrow()
        expect(() => Color.parse('#123456789')).toThrow()
    })
    it('parse named color', () => {
        const lime = Color.parse('lime')
        const transparent = Color.parse('transparent')

        expect(lime.$channels).toEqual(new Uint8Array([0, 255, 0, 255]))
        expect(transparent.$channels).toEqual(new Uint8Array([0, 0, 0, 0]))
    })
    it('parse rgb', () => {
        const color = Color.parse('rgba(12, 34, 56, 0.16)')

        expect(color.$channels).toEqual(new Uint8Array([12, 34, 56, 40]))
    })

    it('RGB getters', () => {
        const color = Color.parse('#1234')

        expect(color.red).toStrictEqual(0x11)
        expect(color.green).toStrictEqual(0x22)
        expect(color.blue).toStrictEqual(0x33)
        expect(color.alpha).toStrictEqual(0x44)
    })
    it('HSL getters', () => {
        const color = Color.fromRGB(255, 0, 0)

        expect(color.hue).toStrictEqual(0)
        expect(color.saturation).toStrictEqual(1)
        expect(color.lightness).toStrictEqual(0.5)
    })

    it('toString', () => {
        const transparentLime = Color.fromRGB(0, 255, 0, 0)

        expect(transparentLime.toString('hex')).toEqual('#00ff00')
        expect(transparentLime.toString('hexa')).toEqual('#00ff0000')
        expect(transparentLime.toString('rgb')).toEqual('rgb(0, 255, 0)')
        expect(transparentLime.toString('rgba')).toEqual('rgba(0, 255, 0, 0)')
        expect(transparentLime.toString('hsl')).toEqual('hsl(120deg, 100%, 50%)')
        expect(transparentLime.toString('hsla')).toEqual('hsla(120deg, 100%, 50%, 0)')

        expect(() => transparentLime.toString('throw')).toThrow(/^ColorTypeError:/)
    })
})
