import { openai, supabase } from './config.js';

document.getElementById('input-form').addEventListener('submit', function(e) {
    e.preventDefault()
    const textOneVal = document.getElementById('fav-movie').value
    const textTwoVal = document.getElementById('mood').value
    const textThreeVal = document.getElementById('movie-type').value
    const query = textOneVal + textTwoVal + textThreeVal
    main(query)
})

async function main(input) {
    const embedding = await createEmbedding(input)
    const match = await findNearestMatch(embedding)
    const result = await getChatCompletion(match, input)

    document.getElementById('main-content').innerHTML = result
    document.getElementById('main-content').innerHTML += `
        <button id="reset-btn"> Go Again </button> `

    document.getElementById('reset-btn').addEventListener('click', function() {
        location.reload()
    })
}

async function createEmbedding(input) {
    const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input
    })
    return embeddingResponse.data[0].embedding
}

async function findNearestMatch(embedding) {
    const { data } = await supabase.rpc('match_documents', {
        query_embedding: embedding,
        match_threshold: 0.5,
        match_count: 1
    })
    return data[0].content
}

const chatMessages = [{
    role: 'system',
    content: `You are an expert movie recommender.
            I need you to take the user inputs that the user gives,
            and generate a perfect movie suggestion based on the 
            input they give, as well as the data you are trained on through
            embeddings. Provide answers in this exact format:
            an h2 title of the movie as well as the date in parentheses,
            then below it a p tag with a short
            and appealing description of the movie.
            DO NOT GIVE THE SAME MOVIE THAT WAS PROVIDED IN
            USER INPUT, just a similar movie the user would like,
            based on the feedback. `
}]

async function getChatCompletion(text, query) {
    chatMessages.push({
        role: 'user',
        content: `Context: ${text}, Question: ${query}`
    })

    const { choices } = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: chatMessages,
        temperature: 0.65,
    })
    return choices[0].message.content
}