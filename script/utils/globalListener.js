export function globalEventListener(event, element, callback) {
    element.addEventListener(event, e => {
        return callback(e)
    })
}