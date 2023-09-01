// polyfills window.crypto
window.crypto = window.crypto || {
    // supposes buf: Uint8Array
    getRandomValues(buf) {
        for (let i = 0; i < buf.length; i++) {
            buf[i] = Math.floor(Math.random() * 256)
        }
    }
}
