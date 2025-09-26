export function convertDate(timestamp) {
    if(!timestamp) return "";

    const date = new Date(timestamp)
    return date.toLocaleDateString("lt-LT", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    })
}