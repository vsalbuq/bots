const fetchContentFromWikipedia = require('./text/fetch-wikipedia')
const sanitizeContent = require('./text/sanitize')
const breakContentIntoSentences = require('./text/to-sentences')

//inicia pela camada de maior abstração do robô (interface pública)
async function robot (content) {
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    breakContentIntoSentences(content)

}

module.exports = robot