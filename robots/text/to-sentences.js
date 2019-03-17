const sentenceBoundaryDetection = require('sbd')

function robot(content){
    breakContentIntoSentences(content)

    function breakContentIntoSentences (content) {
        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
        
        content.sentences = sentences.map(sentence => {
            return {
                text: sentence,
                keywords: [],
                images: []
            }
        })
        
    }
}

module.exports = robot