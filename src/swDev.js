export default function swDev() {
    let swUrl = `/sw.js`; // Fallback to empty string if PUBLIC_URL is undefined
    navigator.serviceWorker.register(swUrl).then((response) => {
        console.warn("response", response)
    })

}