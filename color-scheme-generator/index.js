const randomColors = document.getElementById('random-colors')

document.getElementById('btn').addEventListener('click', function() {
    console.log("clicked")
    const colorChoice = document.getElementById('color-choice').value.slice(1)
    const schemeChoice = document.getElementById('scheme-choice').value.toLowerCase()

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorChoice}&mode=${schemeChoice}`)
        .then(res => res.json())
        .then(data => renderColors(data.colors))
})

function renderColors(colors) {
    colorsHtml = ""
    for (let color of colors) {
        colorsHtml += `
            <div class="color" onclick="copyToClipboard('${color.hex.value}')">
                <div class="swatch" style="background-color: ${color.hex.value};"></div>
                <p class="hex-code"> ${color.hex.value} </p>
            </div>  `
    }
    randomColors.innerHTML = colorsHtml
}

function copyToClipboard(hex) {
    navigator.clipboard.writeText(hex)
    document.getElementById('copy-overlay').classList.remove('hidden')

    setTimeout(function() {
        document.getElementById('copy-overlay').classList.add('hidden')
    }, 2000)
}