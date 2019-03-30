const fetchContentFromWikipedia = require('./text/fetch-wikipedia')
const sanitizeContent = require('./text/sanitize')
const breakContentIntoSentences = require('./text/to-sentences')
const fetchKeywords = require('./text/watson-nlu.js')
const state = require('./state')

//inicia pela camada de maior abstração do robô (interface pública)
async function robot () {
    const content = state.load()

    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    breakContentIntoSentences(content)
    limitMaximumSentences(content)
    await fetchKeywordsOfAllSentences(content)
    
    state.save(content)

    function limitMaximumSentences(content) {
        content.sentences = content.sentences.slice(0, content.maximumSentences)
    }

    async function fetchKeywordsOfAllSentences(content) {
        for(const sentence of content.sentences)
            sentence.keywords = await fetchKeywords(sentence.text)
    }
}

module.exports = robot