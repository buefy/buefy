/**
 * Get value of an object property/path even if it's nested
 */
export function getByPath(obj, path, defaultValue) {
    const value = path.split('.').reduce((o, i) => o[i], obj)
    return value || defaultValue
}
