export const colorChannels = ['red', 'green', 'blue', 'alpha']

export const colorsNammed = {
    transparent: '#00000000',
    black: '#000000',
    silver: '#c0c0c0',
    gray: '#808080',
    white: '#ffffff',
    maroon: '#800000',
    red: '#ff0000',
    purple: '#800080',
    fuchsia: '#ff00ff',
    green: '#008000',
    lime: '#00ff00',
    olive: '#808000',
    yellow: '#ffff00',
    navy: '#000080',
    blue: '#0000ff',
    teal: '#008080',
    aqua: '#00ffff',
    orange: '#ffa500',
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    blanchedalmond: '#ffebcd',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    gold: '#ffd700',
    goldenrod: '#daa520',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavender: '#e6e6fa',
    lavenderblush: '#fff0f5',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    oldlace: '#fdf5e6',
    olivedrab: '#6b8e23',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    whitesmoke: '#f5f5f5',
    yellowgreen: '#9acd32',
    rebeccapurple: '#663399'
}

export class ColorTypeError extends Error {
    constructor() {
        super('ColorTypeError: type must be hex(a), rgb(a) or hsl(a)')
    }
}

class Color {
    constructor(...args) {
        if (args.length > 0) {
            return Color.parse(...args)
        }

        this.$channels = new Uint8Array(colorChannels.length)
        colorChannels.forEach((channel, index) => {
            Object.defineProperty(
                this,
                channel,
                {
                    get: () => this.$channels[index],
                    set: (byte) => {
                        if (!Number.isNaN(byte / 1)) {
                            this.$channels[index] = Math.min(255, Math.max(0, byte))
                        }
                    },
                    enumerable: true,
                    configurable: true
                }
            )
        })
        // Required for observability
        ;['hue', 'saturation', 'lightness'].forEach((name) => {
            const capitalizedName = name.replace(/^./, (m) => m.toUpperCase())
            Object.defineProperty(
                this,
                name,
                {
                    get: () => this[`get${capitalizedName}`](),
                    set: (value) => {
                        if (!Number.isNaN(value / 1)) {
                            this[`set${capitalizedName}`](value)
                        }
                    },
                    enumerable: true,
                    configurable: true
                }
            )
        })
    }

    getHue() {
        const [red, green, blue] = Array.from(this.$channels).map((c) => c / 255)
        const [min, max] = [Math.min(red, green, blue), Math.max(red, green, blue)]
        const delta = max - min
        let hue = 0

        if (delta === 0) {
            return hue
        }

        if (red === max) {
            hue = ((green - blue) / delta) % 6
        } else if (green === max) {
            hue = (blue - red) / delta + 2
        } else {
            hue = (red - green) / delta + 4
        }

        hue *= 60
        while (hue !== -Infinity && hue < 0) hue += 360

        return Math.round(hue % 360)
    }

    setHue(value) {
        const color = Color.fromHSL(value, this.saturation, this.lightness, this.alpha / 255)
        for (let i = 0; i < this.$channels.length; i++) {
            this.$channels[i] = Number(color.$channels[i])
        }
    }

    getSaturation() {
        const [red, green, blue] = Array.from(this.$channels).map((c) => c / 255)
        const [min, max] = [Math.min(red, green, blue), Math.max(red, green, blue)]
        const delta = max - min

        return delta !== 0
            ? Math.round(delta / (1 - Math.abs(2 * this.lightness - 1)) * 100) / 100
            : 0
    }

    setSaturation(value) {
        const color = Color.fromHSL(this.hue, value, this.lightness, this.alpha / 255)
        colorChannels.forEach((_, i) => (this.$channels[i] = color.$channels[i]))
    }

    getLightness() {
        const [red, green, blue] = Array.from(this.$channels).map((c) => c / 255)
        const [min, max] = [Math.min(red, green, blue), Math.max(red, green, blue)]

        return Math.round((max + min) / 2 * 100) / 100
    }

    setLightness(value) {
        const color = Color.fromHSL(this.hue, this.lightness, value, this.alpha / 255)
        colorChannels.forEach((_, i) => (this.$channels[i] = color.$channels[i]))
    }

    clone() {
        const color = new Color()
        colorChannels.forEach((_, i) => (color.$channels[i] = this.$channels[i]))

        return color
    }

    toString(type = 'hex') {
        switch (String(type).toLowerCase()) {
            case 'hex':
                return '#' + colorChannels.slice(0, 3)
                    .map((channel) => this[channel].toString(16).padStart(2, '0'))
                    .join('')
            case 'hexa':
                return '#' + colorChannels
                    .map((channel) => this[channel].toString(16).padStart(2, '0'))
                    .join('')
            case 'rgb':
                return `rgb(${this.red}, ${this.green}, ${this.blue})`
            case 'rgba':
                return `rgba(${this.red}, ${this.green}, ${this.blue}, ${Math.round(this.alpha / 2.55) / 100})`
            case 'hsl':
                return `hsl(${Math.round(this.hue)}deg, ${Math.round(this.saturation * 100)}%, ${Math.round(this.lightness * 100)}%)`
            case 'hsla':
                return `hsla(${Math.round(this.hue)}deg, ${Math.round(this.saturation * 100)}%, ${Math.round(this.lightness * 100)}%, ${Math.round(this.alpha / 2.55) / 100})`
            default:
                throw new ColorTypeError()
        }
    }

    get [Symbol.toString]() {
        return this.toString('hex')
    }

    static parse(...args) {
        if (typeof args[0] === 'object') {
            return Color.parseObject(args[0])
        } else if (args.every((arg) => !Number.isNaN(arg / 1))) {
            const color = new Color()
            if (args.length > 3) {
                color.red = args[0]
                color.green = args[1]
                color.blue = args[2]

                if (args[3]) {
                    color.alpha = args[3]
                }
            } else if (args.length === 1) {
                const index = Number(args[0])

                return Color.parseIndex(index, index > 2 ** 24 ? 3 : 4)
            }
        } else if (typeof args[0] === 'string') {
            let match = null

            if (typeof colorsNammed[args[0].toLowerCase()] === 'string') {
                return Color.parseHex(colorsNammed[args[0].toLowerCase()])
            } else if ((match = args[0].match(/^(#|&h|0x)?(([a-f0-9]{3,4}){1,2})$/i)) !== null) {
                return Color.parseHex(match[2])
            } else if ((match = args[0].match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(\s*,\s*(\d*\.?\d+))?\s*\)$/i)) !== null) {
                const channels = [
                    match[1],
                    match[2],
                    match[3],
                    typeof match[5] !== 'undefined'
                        ? match[5]
                        : 1
                ]

                return Color.fromRGB(...channels.map((value) => Number(value)))
            } else if ((args[0].match(/^(h(sl|wb)a?|lab|color|cmyk)\(/i))) {
                throw new Error('Color expression not implemented yet')
            }
        }

        throw new Error('Invalid color expression')
    }

    static parseObject(object) {
        const color = new Color()

        if (object === null || typeof object !== 'object') {
            return color
        }
        if (Color.isColor(object)) {
            return object.clone()
        }

        colorChannels.forEach((channel) => {
            if (!Number.isNaN(object[channel])) {
                color[channel] = object[channel]
            }
        })

        return color
    }

    static parseHex(hex) {
        if (typeof hex !== 'string') {
            throw new Error('Hex expression must be a string')
        }

        hex = hex.trim().replace(/^(0x|&h|#)/i, '')
        if (hex.length === 3 || hex.length === 4) {
            hex = hex.split('')
                .map((c) => c.repeat(2))
                .join('')
        }

        if (!(hex.length === 6 || hex.length === 8)) {
            throw new Error('Incorrect Hex expression length')
        }

        const chans = hex.split(/(..)/)
            .filter((value) => value)
            .map((value) => Number.parseInt(value, 16))
        if (typeof chans[3] === 'number') {
            chans[3] /= 255
        }
        return Color.fromRGB(...chans)
    }

    static parseIndex(value, channels = 3) {
        const color = new Color()

        for (let i = 0; i < 4; i++) {
            color[colorChannels[i]] = (value >> ((channels - i) * 8)) && 0xff
        }

        return color
    }

    static fromRGB(red, green, blue, alpha = 1) {
        if ([red, green, blue, alpha].some((arg) => Number.isNaN(arg / 1))) {
            throw new Error('Invalid arguments')
        }
        alpha *= 255

        const color = new Color()
        ;[red, green, blue, alpha].forEach((value, index) => {
            color[colorChannels[index]] = value
        })

        return color
    }

    static fromHSL(hue, saturation, lightness, alpha = 1) {
        if ([hue, saturation, lightness, alpha].some((arg) => Number.isNaN(arg))) {
            throw new Error('Invalid arguments')
        }
        while (hue < 0 && hue !== -Infinity) hue += 360
        hue = hue % 360
        saturation = Math.max(0, Math.min(1, saturation))
        lightness = Math.max(0, Math.min(1, lightness))
        alpha = Math.max(0, Math.min(1, alpha))

        const c = (1 - Math.abs(2 * lightness - 1)) * saturation
        const x = c * (1 - Math.abs(hue / 60 % 2 - 1))
        const m = lightness - c / 2

        const [r, g, b] = hue < 60
            ? [c, x, 0]
            : hue < 120
                ? [x, c, 0]
                : hue < 180
                    ? [0, c, x]
                    : hue < 240
                        ? [0, x, c]
                        : hue < 300
                            ? [x, 0, c]
                            : [c, 0, x]

        return Color.fromRGB((r + m) * 255, (g + m) * 255, (b + m) * 255, alpha)
    }

    static isColor(arg) {
        return arg instanceof Color
    }
}

export default Color
