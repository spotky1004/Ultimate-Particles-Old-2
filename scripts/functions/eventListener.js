const keypress = {}

window.addEventListener("keydown", (e) => {
    keypress[e.key] = true
})
window.addEventListener("keyup", (e) => {
    keypress[e.key] = false
})