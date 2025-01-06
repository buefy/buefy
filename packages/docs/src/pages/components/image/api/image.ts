export default [
    {
        props: [
            {
                name: '<code>src</code>',
                description: 'The image url you want to display. You can use webp extension here. Do not forget to specify a fallback for browsers that do not support this format yet.',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>alt</code>',
                description: 'The image alternate text, if it cannot be displayed.',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>src-fallback</code>',
                description: 'The image url you want to display if the image specified using <code>src</code> fails to load.',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>webp-fallback</code>',
                description: 'Fallback when using webp format. You can specify an extension only (.jpg, .jpeg, .png, .gif) if the filename is the same. You can use a full url if not.',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>lazy</code>',
                description: 'Use IntersectionObserver to display the image only when in viewport.',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>responsive</code>',
                description: 'The image will take 100% of the parent width. Use this with <code>ratio</code> to prevent page jump when images are loading.',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>ratio</code>',
                description: 'The space will be reserved. Prevent page jump when images are loading when using <code>responsive</code>.',
                type: 'String',
                values: '<code>1by1</code>, <code>5by4</code>, <code>4by3</code>, <code>3by2</code>, <code>5by3</code>, <code>16by9</code>, <code>2by1</code>, <code>3by1</code>, <code>4by5</code>, <code>3by4</code>, <code>2by3</code>, <code>3by5</code>, <code>9by16</code>, <code>1by2</code> <code>1by3</code> or any string having this format <code>{number}by{number}</code>',
                default: '—'
            },
            {
                name: '<code>placeholder</code>',
                description: 'The image that will be displayed before the src load. Useful if you want to use lqip technique. Will use <code>webp-fallback</code> if only an extension is given.',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>srcset</code>',
                description: 'You can enter a valid <code>srcset</code> value (ex. <code>"image1.webp 400w,image2.webp 800w"</code>). Will use <code>webp-fallback</code> if only an extension is given.',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>srcset-sizes</code>',
                description: 'It will generate a <code>srcset</code> string using those sizes.',
                type: 'Array<Number>',
                values: '—',
                default: '—'
            },
            {
                name: '<code>srcset-formatter</code>',
                description: 'Function to format src according to a given size.',
                type: 'Function',
                values: '—',
                default: '<code>(src, size) => `${srcFilename}-${size}.${srcExt}`</code>'
            },
            {
                name: '<code>rounded</code>',
                description: 'Rounded image.',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>custom-class</code>',
                description: 'Add custom css class to the img tag.',
                type: 'String',
                values: '—',
                default: '—'
            }
        ],
        slots: [
            {
                name: '<code>placeholder</code>',
                description: 'This is to customize the placeholder waiting the image to load.',
            },
        ],
        events: [
            {
                name: '<code>load</code>',
                description: 'Triggers when the image is loaded.',
                parameters: '<code>event: Event</code>, <code>src: String</code>'
            },
            {
                name: '<code>error</code>',
                description: 'Triggers when the image fails to load.',
                parameters: '<code>event: Event</code>, <code>src: String</code>'
            },
        ],
    }
]
