export default function swDev() {
    let swUrl = `${process.env.PUBLIC_URL || ""}/sw.js`; // Fallback to empty string if PUBLIC_URL is undefined
    navigator.serviceWorker.register(swUrl).then((response) => {
        console.warn("response", response)
    })

}