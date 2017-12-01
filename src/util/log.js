const isDebug = false

export function log(info) {
    if (isDebug) {
        console.log(info)
    }
}