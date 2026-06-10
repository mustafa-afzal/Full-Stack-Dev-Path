import express from "express"
import OpenAI from "openai"

const app = express()
app.use(express.json())

const openai = new OpenAI({
    apiKey: process.env.AI_KEY,
    baseURL: process.env.AI_URL,
})

const messages = [
    {
        role: "system",
        content: `You are a precise and fluent translator.
                 Translate the provided text into the requested language.
                 Output only the translated text — nothing else.
                 Do not include introductions, explanations, or notes.
                 Preserve the tone and meaning of the original text.
                 If the text is already in the target language, return it unchanged.
                 Just give me the shortest possible correct translation you can give,
                 and only provide one answer for all translations.`
    },
]

app.post('/api/translate', async(req, res) => {
    const{ userPrompt, language } = req.body
    messages.push({
        role: "user",
        content: `Translate the following to ${language}: ${userPrompt}`
    })
    try {
        const response = await openai.chat.completions.create({
            model: process.env.AI_MODEL,
            messages,
        })

        const translationText = response.choices[0].message.content
        console.log(translationText)

        res.json( { translationText })
    }
    catch(e) {
        console.error(e)
        res.status(500).json({ message: "Something went wrong with server"})
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});