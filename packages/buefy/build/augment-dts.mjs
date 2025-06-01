import * as fs from 'node:fs'

const dtsPaths = [
    './dist/buefy.d.ts',
    {
        path: './temp-dts/utils/vue-augmentation.d.ts',
        transform: (contents) => {
            // excludes lines starting with "import"
            return contents
                .split('\n')
                .filter((line) => line.match(/^\s*import\W/) == null)
                .join('\n')
        }
    },
]
const result = dtsPaths
    .map((dtsPath) => {
        const { path, transform } = typeof dtsPath === 'string'
            ? { path: dtsPath, transform: (x) => x }
            : dtsPath
        return transform(fs.readFileSync(path, 'utf-8'))
    })
    .join('\n')
fs.writeFileSync('./dist/buefy.d.ts', result)
