const translateBtn = document.getElementById('translate-btn')
let translateOriginal = document.querySelector('.form-btns').innerHTML
let savedUserInput = ''

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault()

    if (translateBtn.textContent.trim() === 'Translate') {
        translateBtn.textContent = 'Start Over'
        let userInput = document.getElementById('form-input').value
        savedUserInput = userInput
        const languageInput = document.querySelector('input[name="language"]:checked')
        const language = languageInput ? languageInput.value : null
        document.querySelector('.form-btns').style.alignItems = 'center'
        document.querySelector('.form-btns').style.paddingLeft = '0'
        document.querySelector('.form-btns').innerHTML = `<textarea id="form-output" name="form-output" placeholder="Translation will appear here..." rows="4" readonly></textarea>`
        document.getElementById('translate-text').textContent = 'Original text 👇'
        document.getElementById('language-text').textContent = 'Your translation 👇'
        handleTranslateRequest(userInput, language)
    }
    else {
        translateBtn.textContent = 'Translate'
        document.querySelector('.form-btns').style.alignItems = ''
        document.querySelector('.form-btns').style.paddingLeft = ''
        document.querySelector('.form-btns').innerHTML = translateOriginal
        document.getElementById('translate-text').textContent = 'Text to translate 👇'
        document.getElementById('language-text').textContent = 'Select Language 👇'
        document.getElementById('form-input').value = ""
    }
})

async function handleTranslateRequest(input, language) {
    const userPrompt = input.trim()
    if (!userPrompt || !language) {
        return
    }

    try {
        const response = await fetch('/api/translate', {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ userPrompt, language })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message)
        }

        const translationText = data.translationText

        document.getElementById('form-output').value = translationText
    }
    catch(e) {
        console.error(e)
        document.getElementById('form-output').value = "Sorry, there's an error"
    }

}