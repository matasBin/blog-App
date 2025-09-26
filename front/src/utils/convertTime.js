export function convertTime(timestamp) {
    if(!timestamp) return "";

    const date = new Date(timestamp)
    return date.toLocaleTimeString("lt-LT", {
        hour: "2-digit",
        minute: "2-digit",
    })
}