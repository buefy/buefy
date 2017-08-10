/**
 * Get value of an object property/path even if it's nested
 */
export function getValueByPath(obj, path) {
    const value = path.split('.').reduce((o, i) => o[i], obj)
    return value
}

/**
 * Mobile detection
 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 */
export const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i)
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
    }
}
