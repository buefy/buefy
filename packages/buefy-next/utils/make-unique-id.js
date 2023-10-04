export function makeUniqueId() {
    const values = new Uint8Array(12)
    window.crypto.getRandomValues(values)
    return Array.prototype.map.call(values, (v) => v.toString(16)).join('')
}
